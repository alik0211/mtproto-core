const bigInt = require('big-integer');
const debounce = require('lodash.debounce');
const { meta } = require('../meta');
const { Storage } = require('../storage');
const { Transport } = require('../transport');
const TLSerializer = require('../tl/serializer');
const TLDeserializer = require('../tl/deserializer');
const {
  bytesIsEqual,
  bytesToHex,
  getRandomBytes,
  concatBytes,
  bytesToBigInt,
  bigIntToBytes,
  longToBytesRaw,
  intsToLong,
  getRandomInt,
  bytesToBytesRaw,
  xorBytes,
} = require('../utils/common');
const { pqPrimeFactorization } = require('../utils/pq');
const { AES, RSA, SHA1, SHA256 } = require('../utils/crypto');
const { getRsaKeyByFingerprints } = require('../utils/rsa');

class RPC {
  constructor({ api_id, api_hash, dc, updates }) {
    this.api_id = api_id;
    this.api_hash = api_hash;
    this.dc = dc;
    this.updates = updates;

    this.messagesWaitResponse = new Map();
    this.messagesWaitAuth = [];
    this.pendingAcks = [];
    this.isReady = false;

    this.storage = new Storage(this.dc.id);
    this.storage.set('timeOffset', 0);

    this.updateSession();

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

      this.sendEncryptedMessage(serializer.getBytes(), {
        isContentRelated: false,
      });
    }, 500);
  }
  async handleTransportError(payload) {
    const { type } = payload;

    console.warn('Transport error:', payload);

    // https://core.telegram.org/mtproto/mtproto-transports#transport-errors
    if (type === 'transport') {
      // Auth key not found
      if (payload.code === 404) {
        this.storage.pSet('authKey', null);
        this.storage.pSet('serverSalt', null);

        return this.recconect();
      }

      // transport flood
      if (payload.code === 429) {
        console.warn('Transport flood');
      }
    }
  }
  async handleTransportOpen(event) {
    const authKey = this.storage.pGet('authKey');
    const serverSalt = this.storage.pGet('serverSalt');

    if (authKey && serverSalt) {
      this.handleMessage = this.handleEncryptedMessage;
      this.isReady = true;
      this.sendWaitMessages();

      // This request is necessary to ensure that you start interacting with the server. If we have not made any request, the server will not send us updates.
      this.call('help.getConfig')
        .then(result => {
          // TODO: Handle config
        })
        .catch(error => {
          console.log(`Error when calling the method help.getConfig:`, error);
        });
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

    const encryptedData = new RSA(publicKey).encrypt(innerData);

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
      decryptedData.slice(20).buffer
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

    this.verifyDhParams(this.g, this.dhPrime, this.gA);

    this.generateDH();
  }

  verifyDhParams(g, dhPrime, gA) {
    if (g.toJSNumber() !== 3) {
      throw new Error('Server_DH_inner_data.g must be equal to 3');
    }

    if (
      dhPrime.toString(16) !==
      'c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b'
    ) {
      throw new Error('Server_DH_inner_data.dh_prime incorrect');
    }

    if (gA.lesserOrEquals(bigInt.one)) {
      throw new Error('Server_DH_inner_data.g_a incorrect: g_a <= 1');
    }

    if (gA.greaterOrEquals(dhPrime.minus(bigInt.one))) {
      throw new Error(
        'Server_DH_inner_data.g_a incorrect: g_a >= dh_prime - 1'
      );
    }

    const twoPow = bigInt(2).pow(2048 - 64);

    if (gA.lesser(twoPow)) {
      throw new Error('Server_DH_inner_data.g_a incorrect: g_a < 2^{2048-64}');
    }

    if (gA.greaterOrEquals(dhPrime.minus(twoPow))) {
      throw new Error(
        'Server_DH_inner_data.g_a incorrect: g_a >= dh_prime - 2^{2048-64}'
      );
    }
  }

  async generateDH(retryId = 0) {
    const b = bytesToBigInt(getRandomBytes(256));
    const authKey = bytesToBytesRaw(
      bigIntToBytes(this.gA.modPow(b, this.dhPrime))
    );
    const serverSalt = bytesToBytesRaw(
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

    const innerDataHash = await SHA1(innerData);
    const paddingLength = 16 - ((innerDataHash.length + innerData.length) % 16);

    const encryptedData = new AES.IGE(this.tmpAesKey, this.tmpAesIV).encrypt(
      concatBytes(innerDataHash, innerData, getRandomBytes(paddingLength))
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
      this.call(method, params).then(resolve).catch(reject);
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

    const plainDeserializer = new TLDeserializer(plaintextData.buffer);

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
            `bad_server_salt. Not found message with id ${message.bad_msg_id}`
          );
        }

        this.storage.pSet(
          'serverSalt',
          longToBytesRaw(message.new_server_salt)
        );
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
        this.storage.pSet('serverSalt', longToBytesRaw(message.server_salt));

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

        waitMessage = this.messagesWaitResponse.get(message.req_msg_id);

        if (message.result._ === 'rpc_error') {
          waitMessage.reject(message.result);
        } else {
          waitMessage.resolve(message.result);
        }

        this.messagesWaitResponse.delete(message.req_msg_id);
        return;

      default:
        this.ackMessage(messageId);
        this.updates.emit(message._, message);
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
      layer: 112,
    });

    serializer.method('initConnection', {
      flags: 0, // because the proxy is not set
      api_id: this.api_id,
      device_model: meta.device_model,
      system_version: meta.system_version,
      app_version: '1.0.0',
      system_lang_code: 'en',
      lang_code: 'en',
    });

    serializer.method(method, {
      api_hash: this.api_hash, // TODO: not found in scheme
      api_id: this.api_id, // TODO: not found in scheme
      ...params,
    });

    return new Promise(async (resolve, reject) => {
      const messageId = await this.sendEncryptedMessage(serializer.getBytes());
      const messageIdAsKey = intsToLong(messageId[0], messageId[1]);

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
  async sendEncryptedMessage(data, options = {}) {
    const { isContentRelated = true } = options;

    const authKey = this.storage.pGetBytes('authKey');
    const serverSalt = this.storage.pGetBytes('serverSalt');
    const messageId = this.getMessageId();
    const seqNo = this.getSeqNo(isContentRelated);
    const minPadding = 12;
    const unpadded = (32 + data.length + minPadding) % 16;
    const padding = minPadding + (unpadded ? 16 - unpadded : 0);

    const plainDataSerializer = new TLSerializer();
    plainDataSerializer.bytesRaw(serverSalt);
    plainDataSerializer.bytesRaw(this.sessionId);
    plainDataSerializer.long(messageId);
    plainDataSerializer.int(seqNo);
    plainDataSerializer.uint32(data.length);
    plainDataSerializer.bytesRaw(data);
    plainDataSerializer.bytesRaw(getRandomBytes(padding));

    const plainData = plainDataSerializer.getBytes();

    const messageKeyLarge = await SHA256(
      concatBytes(authKey.slice(88, 120), plainData)
    );
    const messageKey = messageKeyLarge.slice(8, 24);
    const encryptedData = (
      await this.getAESInstance(authKey, messageKey, false)
    ).encrypt(plainData);

    const authKeyId = (await SHA1(authKey)).slice(-8);
    const serializer = new TLSerializer();
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
    this.lastMessageId = [
      0, // low
      0, // high
    ];
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

  connect() {
    this.transport = new Transport(this.dc);

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

module.exports = { RPC };
