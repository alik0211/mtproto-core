const bigInt = require('big-integer');
const debounce = require('lodash.debounce');
const EventEmitter = require('events');
const Storage = require('./storage');
const Transport = require('./transport');
const TLSerializer = require('./tl/serializer');
const TLDeserializer = require('./tl/deserializer');
const {
  getRandomBytes,
  concatBytes,
  bytesToBigInt,
  bigIntToBytes,
  bytesToArrayBuffer,
  longToBytes,
  longFromInts,
  rsaEncrypt,
  getRandomInt,
  pqPrimeFactorization,
  convertToByteArray,
  xorBytes,
  gzipUncompress,
} = require('./utils/common');
const { AES, SHA1, SHA256, getSRPParams } = require('./utils/crypto');
const { getRsaKeyByFingerprints } = require('./utils/rsa');

class MTProto {
  constructor({ api_id, api_hash, test = false }) {
    this.api_id = api_id;
    this.api_hash = api_hash;
    this.test = test;

    this.messagesWaitResponse = new Map();
    this.messagesWaitAuth = [];
    this.pendingAcks = [];
    this.isReady = false;

    this.storage = new Storage();
    this.storage.set('timeOffset', 0);

    this.updateSession();
    this.setDc();

    this.handleWSError = this.handleWSError.bind(this);

    this.handleTransportError = this.handleTransportError.bind(this);
    this.handleTransportOpen = this.handleTransportOpen.bind(this);
    this.handleTransportClose = this.handleTransportClose.bind(this);
    this.handleTransportMessage = this.handleTransportMessage.bind(this);

    this.connect();

    this.sendAcks = debounce(() => {
      if (!this.pendingAcks.length) {
        return;
      }

      const serializer = new TLSerializer();
      serializer.predicate(
        {
          _: 'msgs_ack',
          msg_ids: this.pendingAcks,
        },
        'MsgsAck'
      );

      this.pendingAcks = [];

      this.sendEncryptedMessage(serializer, { isContentRelated: false });
    }, 500);
  }
  async handleTransportError(event) {}
  async handleTransportOpen(event) {
    const authKey = this.storage.pGet('authKey');
    const serverSalt = this.storage.pGet('serverSalt');

    if (authKey && serverSalt) {
      this.handleMessage = this.handleEncryptedMessage;
      this.isReady = true;
      this.sendWaitMessages();
    } else {
      this.nonce = getRandomBytes(16);
      this.handleMessage = this.handlePQResponse;
      this.sendPlainMessage('req_pq_multi', { nonce: this.nonce });
    }
  }
  async handleTransportClose(event) {
    this.recconect();
  }
  async handleTransportMessage(buffer) {
    this.handleMessage(buffer);
  }

  async handlePQResponse(buffer) {
    const deserializer = new TLDeserializer(buffer);
    const auth_key_id = deserializer.long('auth_key_id');
    const msg_id = deserializer.long('msg_id');
    const msg_len = deserializer.int('msg_len');

    const responsePQ = deserializer.predicate('ResPQ');
    const {
      pq,
      nonce,
      server_nonce,
      server_public_key_fingerprints,
    } = responsePQ;

    const publicKey = await getRsaKeyByFingerprints(
      server_public_key_fingerprints
    );

    const [p, q] = pqPrimeFactorization(pq);

    this.newNonce = getRandomBytes(32);
    this.serverNonce = server_nonce;

    const serializer = new TLSerializer();
    serializer.predicate(
      {
        _: 'p_q_inner_data',
        pq: pq,
        p: p,
        q: q,
        nonce: this.nonce,
        server_nonce: this.serverNonce,
        new_nonce: this.newNonce,
      },
      'P_Q_inner_data'
    );

    const data = serializer.getBytes();
    const dataHash = await SHA1(data);

    const innerData = getRandomBytes(255);
    innerData.set(dataHash);
    innerData.set(data, dataHash.length);

    const encryptedData = rsaEncrypt(publicKey, innerData);

    this.sendPlainMessage('req_DH_params', {
      nonce: this.nonce,
      server_nonce: this.serverNonce,
      p: p,
      q: q,
      public_key_fingerprint: publicKey.fingerprint,
      encrypted_data: encryptedData,
    });

    this.handleMessage = this.handleDHParams;
  }

  async handleDHParams(buffer) {
    const deserializer = new TLDeserializer(buffer);
    const auth_key_id = deserializer.long('auth_key_id');
    const msg_id = deserializer.long('msg_id');
    const msg_len = deserializer.int('msg_len');

    const serverDH = deserializer.predicate('Server_DH_Params');

    this.tmpAesKey = concatBytes(
      await SHA1(concatBytes(this.newNonce, this.serverNonce)),
      (await SHA1(concatBytes(this.serverNonce, this.newNonce))).slice(0, 12)
    );
    this.tmpAesIV = concatBytes(
      (await SHA1(concatBytes(this.serverNonce, this.newNonce))).slice(12, 20),
      await SHA1(concatBytes(this.newNonce, this.newNonce)),
      this.newNonce.slice(0, 4)
    );

    const decryptedData = new AES.IGE(this.tmpAesKey, this.tmpAesIV).decrypt(
      serverDH.encrypted_answer
    );
    const innerDataHash = decryptedData.slice(0, 20);
    const innerDeserializer = new TLDeserializer(
      decryptedData.slice(20).buffer,
      {
        isPlain: true,
      }
    );

    const serverDHInnerData = innerDeserializer.predicate(
      'Server_DH_inner_data'
    );

    this.storage.set(
      'timeOffset',
      Math.floor(Date.now() / 1000) - serverDHInnerData.server_time
    );

    this.dhPrime = bytesToBigInt(serverDHInnerData.dh_prime);
    this.g = bigInt(serverDHInnerData.g);
    this.gA = bytesToBigInt(serverDHInnerData.g_a);

    this.generateDH();
  }

  async generateDH(retryId = 0) {
    const b = bytesToBigInt(getRandomBytes(256));
    const authKey = convertToByteArray(
      bigIntToBytes(this.gA.modPow(b, this.dhPrime))
    );
    const serverSalt = convertToByteArray(
      xorBytes(this.newNonce.slice(0, 8), this.serverNonce.slice(0, 8))
    );

    this.storage.pSet('authKey', authKey);
    this.storage.pSet('serverSalt', serverSalt);

    const innerSerializer = new TLSerializer();
    innerSerializer.predicate(
      {
        _: 'client_DH_inner_data',
        nonce: this.nonce,
        server_nonce: this.serverNonce,
        retry_id: retryId,
        g_b: bigIntToBytes(this.g.modPow(b, this.dhPrime)),
      },
      'Client_DH_Inner_Data'
    );
    const innerData = innerSerializer.getBytes();

    const encryptedData = new AES.IGE(this.tmpAesKey, this.tmpAesIV).encrypt(
      concatBytes(await SHA1(innerData), innerData, 16)
    );

    this.sendPlainMessage('set_client_DH_params', {
      nonce: this.nonce,
      server_nonce: this.serverNonce,
      encrypted_data: encryptedData,
    });

    this.handleMessage = this.handleDHAnswer;
  }

  async handleDHAnswer(buffer) {
    const deserializer = new TLDeserializer(buffer);
    const auth_key_id = deserializer.long('auth_key_id');
    const msg_id = deserializer.long('msg_id');
    const msg_len = deserializer.int('msg_len');

    const serverDHAnswer = deserializer.predicate(
      'Set_client_DH_params_answer'
    );

    if (serverDHAnswer._ === 'dh_gen_ok') {
      this.handleMessage = this.handleEncryptedMessage;
      this.isReady = true;
      this.sendWaitMessages();
    } else {
      console.error(`Invalid Set_client_DH_params_answer:`, serverDHAnswer);
    }
  }

  async sendWaitMessages() {
    this.messagesWaitAuth.forEach(message => {
      const { method, params, resolve, reject } = message;
      this.call(method, params)
        .then(resolve)
        .catch(reject);
    });

    this.messagesWaitAuth = [];
  }

  async handleEncryptedMessage(buffer) {
    const authKey = this.storage.pGetBytes('authKey');

    const deserializer = new TLDeserializer(buffer);
    const authKeyId = deserializer.long();
    const messageKey = deserializer.int128();

    const encryptedData = deserializer.byteView.slice(deserializer.offset);

    const plaintextData = (
      await this.getAESInstance(authKey, messageKey, true)
    ).decrypt(encryptedData);

    const plainDeserializer = new TLDeserializer(plaintextData.buffer, {
      isPlain: true,
    });

    const salt = plainDeserializer.long();
    const sessionId = plainDeserializer.long();
    const messageId = plainDeserializer.long();
    const seqNo = plainDeserializer.uint32();
    const length = plainDeserializer.uint32();

    const result = plainDeserializer.predicate();

    this.handleDecryptedMessage(result, { messageId, seqNo });
  }

  async handleDecryptedMessage(message, params = {}) {
    // console.group(`handleDecryptedMessage ${message._}`);
    // console.log(`message:`, message);
    // console.log(`params:`, params);
    // console.groupEnd(`handleDecryptedMessage ${message._}`);

    const { messageId } = params;
    let waitMessage = null;

    switch (message._) {
      case 'msg_container':
        message.messages.forEach(message => {
          this.handleDecryptedMessage(message.body, {
            messageId: message.msg_id,
          });
        });
        return;

      case 'bad_server_salt':
        waitMessage = this.messagesWaitResponse.get(message.bad_msg_id);

        if (!waitMessage) {
          throw new Error(
            `bad_server_salt. Not found message width id ${message.bad_msg_id}`
          );
        }

        this.storage.pSet('serverSalt', longToBytes(message.new_server_salt));
        this.call(waitMessage.method, waitMessage.params)
          .then(waitMessage.resolve)
          .catch(waitMessage.reject);
        this.messagesWaitResponse.delete(message.bad_msg_id);
        this.ackMessage(messageId);
        return;

      case 'bad_msg_notification':
        return;

      case 'new_session_created':
        this.ackMessage(messageId);

        // this.messagesWaitResponse.delete(message.first_msg_id);
        this.storage.pSet('serverSalt', longToBytes(message.server_salt));

        return;

      case 'msgs_ack':
        // console.log(`msgs_ack:`, message.msg_ids);
        // console.log(`this.messagesWaitResponse:`, this.messagesWaitResponse);
        // message.msg_ids.forEach(msgId => {
        //   this.pendingAcks.forEach((pendingAckMsgId, index) => {
        //     if (msgId === pendingAckMsgId) {
        //       this.pendingAcks.splice(index, 1);
        //     }
        //   });
        // });
        return;

      case 'rpc_result':
        this.ackMessage(messageId);

        if (message.result._ === 'gzip_packed') {
          const uncompressed = bytesToArrayBuffer(
            gzipUncompress(message.result.packed_data)
          );

          const deserializer = new TLDeserializer(uncompressed, {
            isPlain: true,
          });

          message.result = deserializer.predicate();
        }
        waitMessage = this.messagesWaitResponse.get(message.req_msg_id);

        if (message.result._ === 'rpc_error') {
          waitMessage.reject(message.result);
        } else {
          waitMessage.resolve(message.result);
        }

        this.messagesWaitResponse.delete(message.req_msg_id);
        return;

      default:
        return;
    }
  }

  ackMessage(messageId) {
    this.pendingAcks.push(messageId);

    this.sendAcks();
  }

  call(method, params = {}) {
    if (!this.isReady) {
      return new Promise((resolve, reject) => {
        this.messagesWaitAuth.push({ method, params, resolve, reject });
      });
    }

    const serializer = new TLSerializer();

    serializer.method('invokeWithLayer', {
      layer: 108,
    });

    serializer.method('initConnection', {
      flags: 0, // because the proxy is not set
      api_id: this.api_id,
      device_model: navigator.userAgent || 'Unknown UserAgent',
      system_version: navigator.platform || 'Unknown Platform',
      app_version: '1.0.0',
      system_lang_code: navigator.language || 'en',
      lang_code: navigator.language || 'en',
    });

    serializer.method(method, {
      api_hash: this.api_hash, // TODO: not found in scheme
      api_id: this.api_id, // TODO: not found in scheme
      ...params,
    });

    return new Promise(async (resolve, reject) => {
      const messageId = await this.sendEncryptedMessage(serializer);
      const messageIdAsKey = longFromInts(messageId[0], messageId[1]);

      this.messagesWaitResponse.set(messageIdAsKey, {
        method,
        params,
        resolve,
        reject,
      });
    });
  }

  // https://core.telegram.org/mtproto/description#schematic-presentation-of-messages
  // Encrypted Message:
  // 1. auth_key_id (int64)
  // 2. msg_key (int128)
  // 3. encrypted_data
  // encrypted_data:
  // 4. salt (int64)
  // 5. session_id (int64)
  // 6. message_id (int64)
  // 7. seq_no (int32)
  // 8. message_data_length (int32)
  // 9. message_data
  // 10. padding 12..1024
  async sendEncryptedMessage(messageSerializer, options = {}) {
    const { isContentRelated = true } = options;

    const messageData = messageSerializer.getBytes();
    const authKey = this.storage.pGetBytes('authKey');
    const serverSalt = this.storage.pGetBytes('serverSalt');
    const messageId = this.getMessageId();
    const seqNo = this.getSeqNo(isContentRelated);
    const minPadding = 12;
    const unpadded = (32 + messageData.length + minPadding) % 16;
    const padding = minPadding + (unpadded ? 16 - unpadded : 0);

    const plainDataSerializer = new TLSerializer();
    plainDataSerializer.bytesRaw(serverSalt);
    plainDataSerializer.bytesRaw(this.sessionId);
    plainDataSerializer.long(messageId);
    plainDataSerializer.int(seqNo);
    plainDataSerializer.uint32(messageData.length);
    plainDataSerializer.bytesRaw(messageData);
    plainDataSerializer.bytesRaw(getRandomBytes(padding));

    const plainData = plainDataSerializer.getBytes();

    const messageKeyLarge = await SHA256(
      concatBytes(authKey.slice(88, 120), plainData)
    );
    const messageKey = messageKeyLarge.slice(8, 24);
    const encryptedData = (
      await this.getAESInstance(authKey, messageKey, false)
    ).encrypt(plainData);

    const authKeyId = (await SHA1(authKey)).slice(12, 20);
    const serializer = new TLSerializer();
    serializer.setAbridgedHeader(
      authKeyId.length + messageKey.length + encryptedData.length
    );
    serializer.bytesRaw(authKeyId);
    serializer.bytesRaw(messageKey);
    serializer.bytesRaw(encryptedData);

    this.transport.send(serializer.getBytes());

    return messageId;
  }

  sendPlainMessage(method, params) {
    const serializer = new TLSerializer();
    serializer.method(method, params);

    const requestBuffer = serializer.getBuffer();
    const requestLength = requestBuffer.byteLength;
    const requestBytes = new Uint8Array(requestBuffer);

    const header = new TLSerializer();
    header.bytesRaw(new Uint8Array([(requestLength + 20) / 4]));
    header.long([0, 0]); // auth_key_id (8)
    header.long(this.getMessageId()); // msg_id (8)
    header.uint32(requestLength); // request_length (4)

    const headerBuffer = header.getBuffer();
    const headerArray = new Uint8Array(headerBuffer);
    const headerLength = headerBuffer.byteLength;

    const resultBuffer = new ArrayBuffer(headerLength + requestLength);
    const resultBytes = new Uint8Array(resultBuffer);

    resultBytes.set(headerArray);
    resultBytes.set(requestBytes, headerArray.length);

    this.transport.send(resultBytes);
  }

  getMessageId() {
    const timeOffset = this.storage.get('timeOffset');

    const timeTicks = Date.now();
    const timeSec = Math.floor(timeTicks / 1000) + timeOffset;
    const timeMSec = timeTicks % 1000;
    const random = getRandomInt(0xffff);

    const { lastMessageId } = this;

    let messageId = [timeSec, (timeMSec << 21) | (random << 3) | 4];

    if (
      lastMessageId[0] > messageId[0] ||
      (lastMessageId[0] == messageId[0] && lastMessageId[1] >= messageId[1])
    ) {
      messageId = [lastMessageId[0], lastMessageId[1] + 4];
    }

    this.lastMessageId = messageId;

    return messageId;
  }

  getSeqNo(isContentRelated = true) {
    let seqNo = this.seqNo * 2;

    if (isContentRelated) {
      seqNo += 1;
      this.seqNo += 1;
    }

    return seqNo;
  }

  updateSession() {
    this.seqNo = 0;
    this.sessionId = getRandomBytes(8);
    this.lastMessageId = [0, 0];
  }

  async getAESInstance(authKey, messageKey, isServer) {
    const x = isServer ? 8 : 0;
    const sha256a = await SHA256(
      concatBytes(messageKey, authKey.slice(x, 36 + x))
    );
    const sha256b = await SHA256(
      concatBytes(authKey.slice(40 + x, 76 + x), messageKey)
    );
    const aesKey = concatBytes(
      sha256a.slice(0, 8),
      sha256b.slice(8, 24),
      sha256a.slice(24, 32)
    );
    const aesIV = concatBytes(
      sha256b.slice(0, 8),
      sha256a.slice(8, 24),
      sha256b.slice(24, 32)
    );
    return new AES.IGE(aesKey, aesIV);
  }

  changeDc(dcId) {
    // TODO: Add import/export auth
    this.setDc(dcId);
    this.recconect();
  }

  setDc(dcId) {
    dcId = dcId || this.storage.get('dcId') || 2;
    this.storage.setPrefix(dcId);
    this.storage.set('dcId', dcId);

    const subdomainsMap = {
      1: 'pluto',
      2: 'venus',
      3: 'aurora',
      4: 'vesta',
      5: 'flora',
    };

    const urlPath = this.test ? '/apiws_test' : '/apiws';

    this.url = `wss://${subdomainsMap[dcId]}.web.telegram.org${urlPath}`;
  }

  connect() {
    this.transport = new Transport(this.url);

    this.transport.on('error', this.handleTransportError);
    this.transport.on('open', this.handleTransportOpen);
    this.transport.on('close', this.handleTransportClose);
    this.transport.on('message', this.handleTransportMessage);
  }

  recconect() {
    this.isReady = false;

    this.transport.destroy();

    this.connect();
  }
}

MTProto.getSRPParams = getSRPParams;

module.exports = MTProto;
