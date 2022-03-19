const bigInt = require('big-integer');
const debounce = require('lodash.debounce');
const AES = require('../crypto/aes');
const builderMap = require('../tl/builder');
const Serializer = require('../tl/serializer');
const Deserializer = require('../tl/deserializer');
const {
  xorBytes,
  intsToLong,
  concatBytes,
  getRandomInt,
  bytesIsEqual,
  bigIntToBytes,
  bytesToBigInt,
  longToBytesRaw,
  bytesToBytesRaw,
} = require('../utils/common');
const baseDebug = require('../utils/common/base-debug');
const pqPrimeFactorization = require('../crypto/pq');

class RPC {
  constructor({ dc, context, transport }) {
    this.dc = dc;
    this.crypto = context.crypto;
    this.context = context;
    this.transport = transport;

    this.debug = baseDebug.extend(`rpc-${this.dc.id}`);
    this.debug('init');

    this.isAuth = false;
    this.pendingAcks = [];
    this.messagesWaitAuth = [];
    this.messagesWaitResponse = new Map();

    this.updateSession();

    this.transport.on('open', this.handleTransportOpen.bind(this));
    this.transport.on('error', this.handleTransportError.bind(this));
    this.transport.on('message', this.handleTransportMessage.bind(this));

    this.sendAcks = debounce(() => {
      if (!this.pendingAcks.length || !this.isReady) {
        return;
      }

      const serializer = new Serializer(builderMap.mt_msgs_ack, {
        msg_ids: this.pendingAcks,
      });

      const bytes = serializer.getBytes();

      this.pendingAcks = [];

      this.sendEncryptedMessage(bytes, {
        isContentRelated: false,
      });
    }, 500);
  }

  get isReady() {
    return this.isAuth && this.transport.isAvailable;
  }

  async handleTransportError(payload) {
    const { type } = payload;

    this.debug('transport error', payload);

    // https://core.telegram.org/mtproto/mtproto-transports#transport-errors
    if (type === 'transport') {
      // Auth key not found
      if (payload.code === 404) {
        await this.setStorageItem('authKey', null);
        await this.setStorageItem('serverSalt', null);
      }

      // transport flood
      if (payload.code === 429) {
        this.debug('transport flood');
      }
    }
  }

  async handleTransportOpen() {
    const authKey = await this.getStorageItem('authKey');
    const serverSalt = await this.getStorageItem('serverSalt');

    if (authKey && serverSalt) {
      this.handleMessage = this.handleEncryptedMessage;
      this.isAuth = true;
      this.sendWaitMessages();

      // This request is necessary to ensure that you start interacting with the server. If we have not made any request, the server will not send us updates.
      this.call('help.getConfig')
        .then((result) => {
          // TODO: Handle config
        })
        .catch((error) => {
          this.debug(`error when calling the method help.getConfig:`, error);
        });
    } else {
      this.nonce = this.crypto.getRandomBytes(16);
      this.handleMessage = this.handlePQResponse;
      this.sendPlainMessage(builderMap.mt_req_pq_multi, { nonce: this.nonce });
    }
  }

  async handleTransportMessage(buffer) {
    this.handleMessage(buffer);
  }

  async handlePQResponse(buffer) {
    const deserializer = new Deserializer(buffer);
    deserializer.long(); // auth_key_id
    deserializer.long(); // msg_id
    deserializer.int32(); // msg_len

    const responsePQ = deserializer.predicate();
    const {
      pq,
      nonce,
      server_nonce,
      server_public_key_fingerprints,
    } = responsePQ;

    if (!bytesIsEqual(this.nonce, nonce)) {
      throw new Error('The nonce are not equal');
    }

    const publicKey = await this.crypto.rsa.getRsaKeyByFingerprints(
      server_public_key_fingerprints
    );

    const [p, q] = pqPrimeFactorization(pq);

    this.newNonce = this.crypto.getRandomBytes(32);
    this.serverNonce = server_nonce;

    const serializer = new Serializer(builderMap.mt_p_q_inner_data, {
      pq: pq,
      p: p,
      q: q,
      nonce: this.nonce,
      server_nonce: this.serverNonce,
      new_nonce: this.newNonce,
    });

    const data = serializer.getBytes();
    const dataHash = await this.crypto.SHA1(data);

    const innerData = this.crypto.getRandomBytes(255);
    innerData.set(dataHash);
    innerData.set(data, dataHash.length);

    const encryptedData = this.crypto.rsa.encrypt(publicKey, innerData);

    this.sendPlainMessage(builderMap.mt_req_DH_params, {
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
    const deserializer = new Deserializer(buffer);
    deserializer.long(); // auth_key_id
    deserializer.long(); // msg_id
    deserializer.int32(); // msg_len

    const serverDH = deserializer.predicate();
    const { nonce, server_nonce, encrypted_answer } = serverDH;

    if (!bytesIsEqual(this.nonce, nonce)) {
      throw new Error('The nonce are not equal');
    }

    if (!bytesIsEqual(this.serverNonce, server_nonce)) {
      throw new Error('The server_nonce are not equal');
    }

    this.tmpAesKey = concatBytes(
      await this.crypto.SHA1(concatBytes(this.newNonce, this.serverNonce)),
      (
        await this.crypto.SHA1(concatBytes(this.serverNonce, this.newNonce))
      ).slice(0, 12)
    );
    this.tmpAesIV = concatBytes(
      (
        await this.crypto.SHA1(concatBytes(this.serverNonce, this.newNonce))
      ).slice(12, 20),
      await this.crypto.SHA1(concatBytes(this.newNonce, this.newNonce)),
      this.newNonce.slice(0, 4)
    );

    const decryptedData = new AES.IGE(this.tmpAesKey, this.tmpAesIV).decrypt(
      encrypted_answer
    );
    const innerDataHash = decryptedData.slice(0, 20);
    const innerDeserializer = new Deserializer(decryptedData.slice(20).buffer);
    const serverDHInnerData = innerDeserializer.predicate();

    if (
      !bytesIsEqual(
        innerDataHash,
        await this.crypto.SHA1(
          decryptedData.slice(20, 20 + innerDeserializer.offset)
        )
      )
    ) {
      throw new Error('Invalid hash in DH params decrypted data');
    }

    await this.context.storage.set(
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
    const b = bytesToBigInt(this.crypto.getRandomBytes(256));
    const authKey = bigIntToBytes(this.gA.modPow(b, this.dhPrime));
    const serverSalt = xorBytes(
      this.newNonce.slice(0, 8),
      this.serverNonce.slice(0, 8)
    );

    await this.setStorageItem('authKey', bytesToBytesRaw(authKey));
    await this.setStorageItem('serverSalt', bytesToBytesRaw(serverSalt));

    this.authKeyAuxHash = bytesToBytesRaw(
      (await this.crypto.SHA1(authKey)).slice(0, 8)
    );

    const serializer = new Serializer(builderMap.mt_client_DH_inner_data, {
      nonce: this.nonce,
      server_nonce: this.serverNonce,
      retry_id: retryId,
      g_b: bigIntToBytes(this.g.modPow(b, this.dhPrime)),
    });

    const innerData = serializer.getBytes();

    const innerDataHash = await this.crypto.SHA1(innerData);
    const paddingLength = 16 - ((innerDataHash.length + innerData.length) % 16);

    const encryptedData = new AES.IGE(this.tmpAesKey, this.tmpAesIV).encrypt(
      concatBytes(
        innerDataHash,
        innerData,
        this.crypto.getRandomBytes(paddingLength)
      )
    );

    this.sendPlainMessage(builderMap.mt_set_client_DH_params, {
      nonce: this.nonce,
      server_nonce: this.serverNonce,
      encrypted_data: encryptedData,
    });

    this.handleMessage = this.handleDHAnswer;
  }

  async handleDHAnswer(buffer) {
    const deserializer = new Deserializer(buffer);
    deserializer.long(); // auth_key_id
    deserializer.long(); // msg_id
    deserializer.int32(); // msg_len

    const serverDHAnswer = deserializer.predicate();

    const { nonce, server_nonce } = serverDHAnswer;

    if (!bytesIsEqual(this.nonce, nonce)) {
      throw new Error('The nonce are not equal');
    }

    if (!bytesIsEqual(this.serverNonce, server_nonce)) {
      throw new Error('The server_nonce are not equal');
    }

    if (serverDHAnswer._ === 'mt_dh_gen_ok') {
      const hash = (
        await this.crypto.SHA1(
          concatBytes(this.newNonce, [1], this.authKeyAuxHash)
        )
      ).slice(4, 20);

      if (!bytesIsEqual(hash, serverDHAnswer.new_nonce_hash1)) {
        throw new Error(`Invalid hash in mt_dh_gen_ok`);
      }

      this.handleMessage = this.handleEncryptedMessage;
      this.isAuth = true;
      this.sendWaitMessages();

      return;
    }

    if (serverDHAnswer._ === 'mt_dh_gen_retry') {
      const hash = (
        await this.crypto.SHA1(
          concatBytes(this.newNonce, [2], this.authKeyAuxHash)
        )
      ).slice(4, 20);

      if (!bytesIsEqual(hash, serverDHAnswer.new_nonce_hash2)) {
        throw new Error(`Invalid hash in mt_dh_gen_retry`);
      }

      this.generateDH(this.authKeyAuxHash);

      return;
    }

    if (serverDHAnswer._ === 'mt_dh_gen_fail') {
      const hash = (
        await this.crypto.SHA1(
          concatBytes(this.newNonce, [3], this.authKeyAuxHash)
        )
      ).slice(4, 20);

      if (!bytesIsEqual(hash, serverDHAnswer.new_nonce_hash3)) {
        throw new Error(`Invalid hash in mt_dh_gen_fail`);
      }

      throw new Error(`mt_dh_gen_fail`);
    }

    throw new Error(`Invalid Set_client_DH_params_answer: ${serverDHAnswer}`);
  }

  async sendWaitMessages() {
    // Resend unacknowledged messages
    for (let message of this.messagesWaitResponse.values()) {
      if (message.isAck) {
        continue;
      }
      const { method, params, resolve, reject } = message;
      this.call(method, params).then(resolve).catch(reject);
    }

    this.messagesWaitAuth.forEach((message) => {
      const { method, params, resolve, reject } = message;
      this.call(method, params).then(resolve).catch(reject);
    });

    this.messagesWaitAuth = [];
  }

  async handleEncryptedMessage(buffer) {
    const authKey = new Uint8Array(await this.getStorageItem('authKey'));

    const deserializer = new Deserializer(buffer);
    const authKeyId = deserializer.long();
    const messageKey = deserializer.int128();

    const encryptedData = deserializer.byteView.slice(deserializer.offset);

    const plaintextData = (
      await this.getAESInstance(authKey, messageKey, true)
    ).decrypt(encryptedData);

    const computedMessageKey = (
      await this.crypto.SHA256(
        concatBytes(authKey.slice(96, 128), plaintextData)
      )
    ).slice(8, 24);

    if (!bytesIsEqual(messageKey, computedMessageKey)) {
      console.warn(`Incorrect msg_key`);

      return;
    }

    const plainDeserializer = new Deserializer(plaintextData.buffer);

    const salt = plainDeserializer.long();
    const sessionId = plainDeserializer.long();
    const messageId = plainDeserializer.long();
    const seqNo = plainDeserializer.uint32();
    const length = plainDeserializer.uint32();

    if (length > plaintextData.length) {
      console.warn(
        `Length in message ${messageId} to exceed the plaintext length:`,
        `${length} > ${plaintextData.length}`
      );

      return;
    }

    if (length % 4 !== 0) {
      console.warn(
        `Length ${length} in message ${messageId} is not a multiple of four`
      );

      return;
    }

    const result = plainDeserializer.predicate();

    this.handleDecryptedMessage(result, { messageId, seqNo });
  }

  async handleDecryptedMessage(message, params = {}) {
    const { messageId } = params;

    if (bigInt(messageId).isEven()) {
      this.debug('message id from server is even', message);

      return;
    }

    if (this.pendingAcks.includes(messageId)) {
      this.sendAcks();

      return;
    }

    if (message._ === 'mt_msg_container') {
      this.debug('handling container');

      message.messages.forEach((message) => {
        this.handleDecryptedMessage(message.body, {
          messageId: message.msg_id,
        });
      });

      return;
    }

    if (['mt_bad_server_salt', 'mt_bad_msg_notification'].includes(message._)) {
      this.debug(`handling ${message._} for message ${message.bad_msg_id}`);

      if (message.error_code === 48) {
        await this.setStorageItem(
          'serverSalt',
          longToBytesRaw(message.new_server_salt)
        );
      }

      if ([16, 17].includes(message.error_code)) {
        const serverTime = bigInt(messageId).shiftRight(32).toJSNumber();
        const timeOffset = Math.floor(Date.now() / 1000) - serverTime;

        await this.context.storage.set('timeOffset', timeOffset);
        this.lastMessageId = [0, 0];
      }

      const waitMessage = this.messagesWaitResponse.get(message.bad_msg_id);

      if (waitMessage) {
        this.call(waitMessage.method, waitMessage.params)
          .then(waitMessage.resolve)
          .catch(waitMessage.reject);
        this.messagesWaitResponse.delete(message.bad_msg_id);
      } else {
        this.debug(`${message._} for a non-existent message`, message);
      }

      return;
    }

    if (message._ === 'mt_new_session_created') {
      this.debug(`handling new session created`);

      this.ackMessage(messageId);
      await this.setStorageItem(
        'serverSalt',
        longToBytesRaw(message.server_salt)
      );

      return;
    }

    if (message._ === 'mt_msgs_ack') {
      this.debug('handling acknowledge for', message.msg_ids);

      message.msg_ids.forEach((msgId) => {
        const waitMessage = this.messagesWaitResponse.get(msgId);

        const nextWaitMessage = {
          ...waitMessage,
          isAck: true,
        };

        this.messagesWaitResponse.set(msgId, nextWaitMessage);
      });

      return;
    }

    if (message._ === 'mt_rpc_result') {
      this.ackMessage(messageId);

      this.debug('handling RPC result for message', message.req_msg_id);

      const waitMessage = this.messagesWaitResponse.get(message.req_msg_id);

      if (message.result._ === 'mt_rpc_error') {
        waitMessage.reject(message.result);
      } else {
        waitMessage.resolve(message.result);
      }

      this.messagesWaitResponse.delete(message.req_msg_id);

      return;
    }

    this.debug('handling update', message._);

    this.ackMessage(messageId);
    this.context.updates.emit(message._, message);
  }

  ackMessage(messageId) {
    this.pendingAcks.push(messageId);

    this.sendAcks();
  }

  async call(method, params = {}) {
    if (!this.isReady) {
      return new Promise((resolve, reject) => {
        this.messagesWaitAuth.push({ method, params, resolve, reject });
      });
    }

    const { api_id, api_hash } = this.context;

    const initConnectionParams = {
      api_id,
      device_model: '@mtproto/core',
      system_version: '6.1.1',
      app_version: '1.0.0',
      system_lang_code: 'en',
      lang_code: 'en',
      ...this.context.initConnectionParams,
    };

    const serializer = new Serializer(builderMap.invokeWithLayer, {
      layer: 139,
      query: {
        _: 'initConnection',
        ...initConnectionParams,
        query: {
          _: method,
          api_id,
          api_hash,
          ...params,
        },
      },
    });

    const bytes = serializer.getBytes();

    return new Promise(async (resolve, reject) => {
      const messageId = await this.sendEncryptedMessage(bytes);
      const messageIdAsKey = intsToLong(messageId[0], messageId[1]);

      this.messagesWaitResponse.set(messageIdAsKey, {
        method,
        params,
        resolve,
        reject,
        isAck: false,
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

    const authKey = new Uint8Array(await this.getStorageItem('authKey'));
    const serverSalt = new Uint8Array(await this.getStorageItem('serverSalt'));
    const messageId = await this.getMessageId();
    const seqNo = this.getSeqNo(isContentRelated);
    const minPadding = 12;
    const unpadded = (32 + data.length + minPadding) % 16;
    const padding = minPadding + (unpadded ? 16 - unpadded : 0);

    const { crypto, sessionId } = this;

    const plainDataSerializer = new Serializer(function () {
      this.bytesRaw(serverSalt);
      this.bytesRaw(sessionId);
      this.long(messageId);
      this.int32(seqNo);
      this.uint32(data.length);
      this.bytesRaw(data);
      this.bytesRaw(crypto.getRandomBytes(padding));
    });

    const plainData = plainDataSerializer.getBytes();

    const messageKeyLarge = await crypto.SHA256(
      concatBytes(authKey.slice(88, 120), plainData)
    );
    const messageKey = messageKeyLarge.slice(8, 24);
    const encryptedData = (
      await this.getAESInstance(authKey, messageKey, false)
    ).encrypt(plainData);

    const authKeyId = (await crypto.SHA1(authKey)).slice(-8);
    const serializer = new Serializer(function () {
      this.bytesRaw(authKeyId);
      this.bytesRaw(messageKey);
      this.bytesRaw(encryptedData);
    });

    this.transport.send(serializer.getBytes());

    return messageId;
  }

  async sendPlainMessage(fn, params) {
    const serializer = new Serializer(fn, params);

    const requestBytes = serializer.getBytes();
    const requestLength = requestBytes.length;

    const messageId = await this.getMessageId();

    const header = new Serializer(function () {
      this.long([0, 0]);
      this.long(messageId);
      this.uint32(requestLength);
    });

    const headerBytes = header.getBytes();
    const headerLength = headerBytes.length;

    const resultBuffer = new ArrayBuffer(headerLength + requestLength);
    const resultBytes = new Uint8Array(resultBuffer);

    resultBytes.set(headerBytes);
    resultBytes.set(requestBytes, headerLength);

    this.transport.send(resultBytes);
  }

  async getMessageId() {
    // @TODO: Check timeOffset
    const timeOffset = await this.context.storage.get('timeOffset');

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
    this.sessionId = this.crypto.getRandomBytes(8);
    this.lastMessageId = [
      0, // low
      0, // high
    ];
  }

  async getAESInstance(authKey, messageKey, isServer) {
    const x = isServer ? 8 : 0;
    const sha256a = await this.crypto.SHA256(
      concatBytes(messageKey, authKey.slice(x, 36 + x))
    );
    const sha256b = await this.crypto.SHA256(
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

  async setStorageItem(key, value) {
    return this.context.storage.set(`${this.dc.id}${key}`, value);
  }

  async getStorageItem(key) {
    return this.context.storage.get(`${this.dc.id}${key}`);
  }
}

module.exports = RPC;
