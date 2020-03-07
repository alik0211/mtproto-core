const bigInt = require('big-integer');
const debounce = require('lodash.debounce');
const EventEmitter = require('events');
const http = require('./transport');
const { SecureRandom } = require('./vendors/jsbn');
const { TLSerialization, TLDeserialization } = require('./tl');
const TLSerializer = require('./tl/serializer');
const {
  getSRPParams,
  arrayBufferToBase64,
  bigStringInt,
  bytesToHex,
  bytesFromHex,
  bytesCmp,
  bytesXor,
  bytesToArrayBuffer,
  convertToArrayBuffer,
  convertToUint8Array,
  bytesFromArrayBuffer,
  bufferConcat,
  longToBytes,
  longFromInts,
  sha1BytesSync,
  sha256HashSync,
  rsaEncrypt,
  aesEncryptSync,
  aesDecryptSync,
  nextRandomInt,
  pqPrimeFactorization,
  bytesModPow,
  getNonce,
  getAesKeyIv,
  tsNow,
} = require('./utils');
const RsaKeysManager = require('./utils/rsa');

const secureRandom = new SecureRandom();

function Deferred() {
  this.resolve = null;
  this.reject = null;
  this.promise = new Promise((resolve, reject) => {
    this.resolve = resolve;
    this.reject = reject;
  });
  Object.freeze(this);
}

class API extends EventEmitter {
  constructor({ api_id, api_hash, test, https }) {
    super();

    this.api_id = api_id;
    this.api_hash = api_hash;
    this.test = test;
    this.https = https;

    this.localTime = tsNow();
    this.lastMessageId = [0, 0];
    this.timeOffset = 0;
    this._seqNo = 0;
    this.sessionId = null;
    this.prevSessionId = null;
    this.longPollRunning = false;

    // TODO: Use Map()
    this.sentMessages = {};
    this.pendingAcks = [];

    this.sendAcks = debounce(() => {
      if (!this.pendingAcks.length) {
        return;
      }

      // console.log(`JSON.stringify(pendingAcks):`, JSON.stringify(pendingAcks));

      const waitSerializer = new TLSerializer({ mtproto: true });
      waitSerializer.method('http_wait', {
        max_delay: 500,
        wait_after: 150,
        max_wait: 1000,
      });
      const waitMessage = {
        msg_id: this.generateMessageId(),
        seq_no: this.generateSeqNo(),
        body: waitSerializer.getBytes(),
      };

      const serializer = new TLSerializer({ mtproto: true });
      serializer.predicate(
        {
          _: 'msgs_ack',
          msg_ids: this.pendingAcks,
        },
        'MsgsAck'
      );

      const message = {
        msg_id: this.generateMessageId(),
        seq_no: this.generateSeqNo(true),
        body: serializer.getBytes(),
      };

      this.pendingAcks = [];

      this.sendEncryptedRequest([waitMessage, message]);
    }, 500);

    this.updateSession();
    this.setDc();
  }

  init() {
    const serverSalt = this.getServerSalt();
    const authKey = this.getAuthKey();

    if (serverSalt && authKey) {
      this.setServerSalt(serverSalt);
      this.setAuthKey(authKey);

      this.runLongPoll();

      return Promise.resolve();
    }

    const nonce = getNonce();
    const request = new TLSerializer({ mtproto: true });
    request.method('req_pq_multi', { nonce });

    return this.sendPlainRequest(request.getBuffer()).then(deserializer => {
      const responsePQ = deserializer.fetchObject('ResPQ');
      console.log('2. response', responsePQ);

      if (responsePQ._ != 'resPQ') {
        throw new Error('[MT] resPQ response invalid: ' + responsePQ._);
      }

      if (!bytesCmp(nonce, responsePQ.nonce)) {
        throw new Error('[MT] resPQ nonce mismatch');
      }

      const serverNonce = responsePQ.server_nonce;
      const pq = responsePQ.pq;
      const publicKey = RsaKeysManager.select(
        responsePQ.server_public_key_fingerprints
      );

      // console.log(
      //   'Got ResPQ',
      //   bytesToHex(responsePQ.server_nonce),
      //   bytesToHex(responsePQ.pq),
      //   responsePQ.server_public_key_fingerprints
      // );

      if (!publicKey) {
        throw new Error('[MT] No public key found');
      }

      const [p, q] = pqPrimeFactorization(pq);

      const newNonce = new Array(32);
      secureRandom.nextBytes(newNonce);

      const data = new TLSerializer({ mtproto: true });
      data.predicate(
        {
          _: 'p_q_inner_data',
          pq: pq,
          p: p,
          q: q,
          nonce: nonce,
          server_nonce: serverNonce,
          new_nonce: newNonce,
        },
        'P_Q_inner_data'
      );

      const dataWithHash = sha1BytesSync(data.getBuffer()).concat(
        data.getBytes()
      );

      const request = new TLSerializer({ mtproto: true });
      request.method('req_DH_params', {
        nonce: nonce,
        server_nonce: serverNonce,
        p: p,
        q: q,
        public_key_fingerprint: publicKey.fingerprint,
        encrypted_data: rsaEncrypt(publicKey, dataWithHash),
      });

      return this.sendPlainRequest(request.getBuffer()).then(deserializer => {
        const responseDH = deserializer.fetchObject(
          'Server_DH_Params',
          'RESPONSE'
        );
        console.log('3. responseDH', responseDH);

        if (
          responseDH._ != 'server_DH_params_fail' &&
          responseDH._ != 'server_DH_params_ok'
        ) {
          throw new Error(
            '[MT] Server_DH_Params response invalid: ' + responseDH._
          );
        }

        if (!bytesCmp(nonce, responseDH.nonce)) {
          throw new Error('[MT] Server_DH_Params nonce mismatch');
        }

        if (!bytesCmp(serverNonce, responseDH.server_nonce)) {
          throw new Error('[MT] Server_DH_Params server_nonce mismatch');
        }

        if (responseDH._ == 'server_DH_params_fail') {
          var newNonceHash = sha1BytesSync(newNonce).slice(-16);
          if (!bytesCmp(newNonceHash, responseDH.new_nonce_hash)) {
            throw new Error(
              '[MT] server_DH_params_fail new_nonce_hash mismatch'
            );
          }
          throw new Error('[MT] server_DH_params_fail');
        }

        this.localTime = tsNow();

        const tmpAesKey = sha1BytesSync(newNonce.concat(serverNonce)).concat(
          sha1BytesSync(serverNonce.concat(newNonce)).slice(0, 12)
        );
        const tmpAesIv = sha1BytesSync(serverNonce.concat(newNonce))
          .slice(12)
          .concat(
            sha1BytesSync([].concat(newNonce, newNonce)),
            newNonce.slice(0, 4)
          );

        const answerWithHash = aesDecryptSync(
          responseDH.encrypted_answer,
          tmpAesKey,
          tmpAesIv
        );

        var hash = answerWithHash.slice(0, 20);
        var answerWithPadding = answerWithHash.slice(20);
        var buffer = bytesToArrayBuffer(answerWithPadding);

        var deserializer = new TLDeserialization(buffer, { mtproto: true });
        const responseDHInner = deserializer.fetchObject(
          'Server_DH_inner_data'
        );

        console.log('4. responseDHInner', responseDHInner);

        if (responseDHInner._ != 'server_DH_inner_data') {
          throw new Error(
            '[MT] server_DH_inner_data response invalid: ' + constructor
          );
        }

        if (!bytesCmp(nonce, responseDHInner.nonce)) {
          throw new Error('[MT] server_DH_inner_data nonce mismatch');
        }

        if (!bytesCmp(serverNonce, responseDHInner.server_nonce)) {
          throw new Error('[MT] server_DH_inner_data serverNonce mismatch');
        }

        console.log('5. Done decrypting answer');

        const g = responseDHInner.g;
        const dhPrime = responseDHInner.dh_prime;
        const gA = responseDHInner.g_a;
        const retry = 0;

        console.log('6. verifyDhParams start');
        this.verifyDhParams(g, dhPrime, gA);
        console.log('7. verifyDhParams finish');

        var offset = deserializer.getOffset();

        if (
          !bytesCmp(hash, sha1BytesSync(answerWithPadding.slice(0, offset)))
        ) {
          throw new Error('[MT] server_DH_inner_data SHA1-hash mismatch');
        }

        this.applyServerTime(responseDHInner.server_time);

        return this.sendSetClientDhParams({
          nonce,
          serverNonce,
          newNonce,
          tmpAesKey,
          tmpAesIv,
          g,
          dhPrime,
          gA,
          retry,
        }).then(() => {
          this.runLongPoll();

          return Promise.resolve();
        });
      });
    });
  }

  verifyDhParams(g, dhPrime, gA) {
    console.log('Verifying DH params');
    const dhPrimeHex = bytesToHex(dhPrime);

    if (
      g != 3 ||
      dhPrimeHex !==
        'c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b'
    ) {
      // The verified value is from https://core.telegram.org/mtproto/security_guidelines
      throw new Error('[MT] DH params are not verified: unknown dhPrime');
    }

    console.log('dhPrime cmp OK');

    const gABigInt = bigInt(bytesToHex(gA), 16);
    const dhPrimeBigInt = bigInt(dhPrimeHex, 16);

    if (gABigInt.compareTo(bigInt.one) <= 0) {
      throw new Error('[MT] DH params are not verified: gA <= 1');
    }

    if (gABigInt.compareTo(dhPrimeBigInt.subtract(bigInt.one)) >= 0) {
      throw new Error('[MT] DH params are not verified: gA >= dhPrime - 1');
    }

    console.log('1 < gA < dhPrime-1 OK');

    const twoPow = bigInt(2).pow(2048 - 64);

    if (gABigInt.compareTo(twoPow) < 0) {
      throw new Error('[MT] DH params are not verified: gA < 2^{2048-64}');
    }

    if (gABigInt.compareTo(dhPrimeBigInt.subtract(twoPow)) >= 0) {
      throw new Error(
        '[MT] DH params are not verified: gA > dhPrime - 2^{2048-64}'
      );
    }

    console.log('2^{2048-64} < gA < dhPrime-2^{2048-64} OK');

    return true;
  }

  sendSetClientDhParams(auth) {
    var gBytes = bytesFromHex(auth.g.toString(16));

    auth.b = new Array(256);
    secureRandom.nextBytes(auth.b);

    const gB = bytesModPow(gBytes, auth.b, auth.dhPrime);
    const data = new TLSerializer({ mtproto: true });
    data.predicate(
      {
        _: 'client_DH_inner_data',
        nonce: auth.nonce,
        server_nonce: auth.serverNonce,
        retry_id: [0, auth.retry++], // long (:
        g_b: gB,
      },
      'Client_DH_Inner_Data'
    );

    var dataWithHash = sha1BytesSync(data.getBuffer()).concat(data.getBytes());

    var encryptedData = aesEncryptSync(
      dataWithHash,
      auth.tmpAesKey,
      auth.tmpAesIv
    );

    const request = new TLSerializer({ mtproto: true });
    request.method('set_client_DH_params', {
      nonce: auth.nonce,
      server_nonce: auth.serverNonce,
      encrypted_data: encryptedData,
    });

    console.log('Send set_client_DH_params');
    return this.sendPlainRequest(request.getBuffer()).then(deserializer => {
      var response = deserializer.fetchObject('Set_client_DH_params_answer');

      if (
        response._ != 'dh_gen_ok' &&
        response._ != 'dh_gen_retry' &&
        response._ != 'dh_gen_fail'
      ) {
        throw new Error(
          '[MT] Set_client_DH_params_answer response invalid: ' + response._
        );
      }

      if (!bytesCmp(auth.nonce, response.nonce)) {
        throw new Error('[MT] Set_client_DH_params_answer nonce mismatch');
      }

      if (!bytesCmp(auth.serverNonce, response.server_nonce)) {
        throw new Error(
          '[MT] Set_client_DH_params_answer server_nonce mismatch'
        );
      }

      const authKey = bytesModPow(auth.gA, auth.b, auth.dhPrime);
      const authKeyHash = sha1BytesSync(authKey);
      const authKeyAux = authKeyHash.slice(0, 8);
      const authKeyId = authKeyHash.slice(-8);

      console.log('Got Set_client_DH_params_answer', response._, response);
      switch (response._) {
        case 'dh_gen_ok':
          var newNonceHash1 = sha1BytesSync(
            auth.newNonce.concat([1], authKeyAux)
          ).slice(-16);

          if (!bytesCmp(newNonceHash1, response.new_nonce_hash1)) {
            throw new Error(
              '[MT] Set_client_DH_params_answer new_nonce_hash1 mismatch'
            );
          }

          var serverSalt = bytesXor(
            auth.newNonce.slice(0, 8),
            auth.serverNonce.slice(0, 8)
          );
          console.log('Auth successfull!', authKeyId, authKey, serverSalt);

          auth.authKeyId = authKeyId;
          this.setAuthKey(authKey);
          this.setServerSalt(serverSalt);

          return auth;

        case 'dh_gen_retry':
          var newNonceHash2 = sha1BytesSync(
            auth.newNonce.concat([2], authKeyAux)
          ).slice(-16);
          if (!bytesCmp(newNonceHash2, response.new_nonce_hash2)) {
            throw new Error(
              '[MT] Set_client_DH_params_answer new_nonce_hash2 mismatch'
            );
          }

          return this.sendSetClientDhParams(auth);

        case 'dh_gen_fail':
          var newNonceHash3 = sha1BytesSync(
            auth.newNonce.concat([3], authKeyAux)
          ).slice(-16);
          if (!bytesCmp(newNonceHash3, response.new_nonce_hash3)) {
            throw new Error(
              '[MT] Set_client_DH_params_answer new_nonce_hash3 mismatch'
            );
          }

          throw new Error('[MT] Set_client_DH_params_answer fail');
      }
    });
  }

  sendEncryptedRequest(messages) {
    // console.log(`sendEncryptedRequest[messages]:`, messages);

    let resultMessage = messages;

    if (Array.isArray(messages)) {
      const messagesByteLength = messages.reduce((accumulator, message) => {
        const length = message.body.byteLength || message.body.length;

        return accumulator + length + 32;
      }, 0);

      const container = new TLSerializer({
        mtproto: true,
        maxLength: messagesByteLength + 64,
      });

      container.int(0x73f1f8dc); // container id
      container.int(messages.length); // container count

      const innerMessages = [];

      messages.forEach(message => {
        container.long(message.msg_id); // 'CONTAINER[i][msg_id]'
        container.int(message.seq_no); // 'CONTAINER[i][seq_no]'
        container.int(message.body.length); // 'CONTAINER[i][bytes]'
        container.bytesRaw(message.body); // 'CONTAINER[i][body]'

        innerMessages.push(message.msg_id);
      });

      const containerSentMessage = {
        msg_id: this.generateMessageId(),
        seq_no: this.generateSeqNo(true),
        container: true,
        inner: innerMessages,
      };

      resultMessage = {
        ...{ body: container.getTypedBytes() },
        ...containerSentMessage,
      };

      this.sentMessages[resultMessage.msg_id] = containerSentMessage;
    }

    return this._sendEncryptedRequest(resultMessage).then(responsePackage => {
      // console.log(`responsePackage:`, responsePackage);
      const { response, messageId } = responsePackage;
      this.processMessage(response, messageId);
      this.sendAcks();
      return responsePackage;
    });
  }

  _sendEncryptedRequest(message) {
    const authKey = this.getAuthKey();
    const authKeyUint8 = convertToUint8Array(authKey);
    const authKeyId = sha1BytesSync(authKey).slice(-8);
    const serverSalt = this.getServerSalt();

    const data = new TLSerializer({
      maxLength: message.body.length + 2048,
    });

    message.deferred = message.deferred || new Deferred();
    this.sentMessages[message.msg_id] = message;

    data.bytesRaw(serverSalt, 64, 'salt');
    data.bytesRaw(this.sessionId, 64, 'session_id');

    data.long(message.msg_id, 'message_id');
    data.int(message.seq_no, 'seq_no');

    data.int(message.body.length, 'message_data_length');
    data.bytesRaw(message.body, 'message_data');

    const dataBuffer = data.getBuffer();

    var paddingLength = 16 - (data.offset % 16) + 16 * (1 + nextRandomInt(5));
    var padding = new Array(paddingLength);
    secureRandom.nextBytes(padding);

    var dataWithPadding = bufferConcat(dataBuffer, padding);

    const encryptedResult = this.getEncryptedMessage(
      dataWithPadding,
      authKeyUint8
    );

    //console.log('encryptedResult.msgKey', encryptedResult.msgKey, dHexDump(encryptedResult.msgKey));

    const request = new TLSerializer({
      maxLength: encryptedResult.bytes.byteLength + 256,
    });
    request.bytesRaw(authKeyId, 64, 'auth_key_id');
    request.bytesRaw(encryptedResult.msgKey, 128, 'msg_key');
    request.bytesRaw(encryptedResult.bytes, 'encrypted_data');

    const requestData = request.getArray();

    return http
      .post(this.url, requestData, {
        responseType: 'arraybuffer',
        transformRequest: null,
      })
      .then(result => {
        if (!result.data || !result.data.byteLength) {
          throw new Error('No data');
        }

        const self = this;

        const responseBuffer = result.data;

        var responseDeserializer = new TLDeserialization(responseBuffer);

        const serverAuthKeyId = responseDeserializer.fetchIntBytes(
          64,
          false,
          'auth_key_id'
        );
        if (!bytesCmp(serverAuthKeyId, authKeyId)) {
          throw new Error(
            '[MT] Invalid server auth_key_id: ' + bytesToHex(serverAuthKeyId)
          );
        }
        var msgKey = responseDeserializer.fetchIntBytes(128, true, 'msg_key');
        var encryptedData = responseDeserializer.fetchRawBytes(
          responseBuffer.byteLength - responseDeserializer.getOffset(),
          true,
          'encrypted_data'
        );

        const dataWithPadding = this.getDecryptedMessage(
          authKeyUint8,
          msgKey,
          encryptedData
        );
        const calcMsgKey = this.getMsgKey(authKeyUint8, dataWithPadding, false);

        //console.log(msgKey, calcMsgKey, dHexDump(msgKey), dHexDump(calcMsgKey));

        if (!bytesCmp(msgKey, calcMsgKey)) {
          console.warn(
            '[MT] msg_keys',
            msgKey,
            bytesFromArrayBuffer(calcMsgKey)
          );
          throw new Error('[MT] server msgKey mismatch');
        }

        var dataDeserializer = new TLDeserialization(dataWithPadding, {
          mtproto: true,
        });

        var salt = dataDeserializer.fetchIntBytes(64, false, 'salt');
        var serverSessionId = dataDeserializer.fetchIntBytes(
          64,
          false,
          'session_id'
        );
        var messageId = dataDeserializer.fetchLong('message_id');

        if (
          !bytesCmp(serverSessionId, this.sessionId) &&
          (!this.prevSessionId || !bytesCmp(this.sessionId, this.prevSessionId))
        ) {
          console.warn(
            'Sessions',
            serverSessionId,
            this.sessionId,
            this.prevSessionId
          );
          throw new Error(
            '[MT] Invalid server session_id: ' + bytesToHex(serverSessionId)
          );
        }

        var seqNo = dataDeserializer.fetchInt('seq_no');

        var totalLength = dataWithPadding.byteLength;

        var messageBodyLength = dataDeserializer.fetchInt(
          'message_data[length]'
        );

        if (
          messageBodyLength % 4 ||
          messageBodyLength > totalLength - dataDeserializer.getOffset()
        ) {
          throw new Error('[MT] Invalid body length: ' + messageBodyLength);
        }
        var messageBody = dataDeserializer.fetchRawBytes(
          messageBodyLength,
          true,
          'message_data'
        );

        var paddingLength = totalLength - dataDeserializer.getOffset();
        if (paddingLength < 12 || paddingLength > 1024) {
          throw new Error('[MT] Invalid padding length: ' + paddingLength);
        }

        var buffer = bytesToArrayBuffer(messageBody);
        var deserializerOptions = {
          mtproto: true,
          override: {
            mt_message: function(result, field) {
              result.msg_id = this.fetchLong(field + '[msg_id]');
              result.seqno = this.fetchInt(field + '[seqno]');
              result.bytes = this.fetchInt(field + '[bytes]');

              var offset = this.getOffset();

              try {
                result.body = this.fetchObject('Object', field + '[body]');
              } catch (e) {
                console.error('parse error', e.message, e.stack);
                result.body = { _: 'parse_error', error: e };
              }
              if (this.offset != offset + result.bytes) {
                this.offset = offset + result.bytes;
              }
            },
            mt_rpc_result: function(result, field) {
              result.req_msg_id = this.fetchLong(field + '[req_msg_id]');

              var sentMessage = self.sentMessages[result.req_msg_id];
              var type = (sentMessage && sentMessage.resultType) || 'Object';

              if (result.req_msg_id && !sentMessage) {
                return;
              }
              result.result = this.fetchObject(type, field + '[result]');
            },
          },
        };
        var finalDeserializer = new TLDeserialization(
          buffer,
          deserializerOptions
        );
        var response = finalDeserializer.fetchObject('', 'INPUT');

        return {
          response,
          messageId,
          sessionId: this.sessionId,
          seqNo,
          messageDeferred: message.deferred.promise,
        };
      });
  }

  sendPlainRequest(requestBuffer) {
    const requestLength = requestBuffer.byteLength;
    const requestArray = new Int32Array(requestBuffer);

    const header = new TLSerializer();
    header.long([0, 0]); // auth_key_id
    header.long(this.generateMessageId()); // msg_id
    header.int(requestLength); // request_length

    const headerBuffer = header.getBuffer();
    const headerArray = new Int32Array(headerBuffer);
    const headerLength = headerBuffer.byteLength;

    const resultBuffer = new ArrayBuffer(headerLength + requestLength);
    const resultArray = new Int32Array(resultBuffer);

    resultArray.set(headerArray);
    resultArray.set(requestArray, headerArray.length);

    const requestData = resultArray;

    return http
      .post(this.url, requestData, {
        responseType: 'arraybuffer',
        transformRequest: null,
      })
      .then(function(result) {
        if (!result.data || !result.data.byteLength) {
          throw new Error('no data');
        }

        var deserializer = new TLDeserialization(result.data, {
          mtproto: true,
        });
        var auth_key_id = deserializer.fetchLong('auth_key_id');
        var msg_id = deserializer.fetchLong('msg_id');
        var msg_len = deserializer.fetchInt('msg_len');

        return deserializer;
      });
  }

  getEncryptedMessage(dataWithPadding, authKeyUint8) {
    const msgKey = this.getMsgKey(authKeyUint8, dataWithPadding, true);
    const keyIv = getAesKeyIv(authKeyUint8, msgKey, true);
    // console.log('after msg key iv')
    //convertToArrayBuffer(aesEncryptSync(dataWithPadding, msgKey, keyIv)) ?
    const encryptedBytes = convertToArrayBuffer(
      aesEncryptSync(dataWithPadding, keyIv[0], keyIv[1])
    );
    return {
      bytes: encryptedBytes,
      msgKey: msgKey,
    };
  }

  getDecryptedMessage(authKeyUint8, msgKey, encryptedData) {
    const keyIv = getAesKeyIv(authKeyUint8, msgKey, false);
    return convertToArrayBuffer(
      aesDecryptSync(encryptedData, keyIv[0], keyIv[1])
    );
  }

  processMessage(message, messageId) {
    // console.log('processMessage', message, messageId);
    let sentMessage;

    switch (message._) {
      case 'msg_container':
        var len = message.messages.length;
        for (var i = 0; i < len; i++) {
          this.processMessage(message.messages[i], message.messages[i].msg_id);
        }
        break;

      case 'bad_server_salt':
        console.log('Bad server salt');
        sentMessage = this.sentMessages[message.bad_msg_id];
        if (!sentMessage || sentMessage.seq_no != message.bad_msg_seqno) {
          console.log(message.bad_msg_id, message.bad_msg_seqno);
          throw new Error('[MT] Bad server salt for invalid message');
        }

        this.setServerSalt(longToBytes(message.new_server_salt));
        this.sendEncryptedRequest(this.sentMessages[message.bad_msg_id]);
        this.ackMessage(messageId);
        break;

      case 'bad_msg_notification':
        console.log('Bad msg notification', message);
        sentMessage = this.sentMessages[message.bad_msg_id];
        if (!sentMessage || sentMessage.seq_no != message.bad_msg_seqno) {
          console.log(message.bad_msg_id, message.bad_msg_seqno);
          throw new Error('[MT] Bad msg notification for invalid message');
        }

        if (message.error_code == 16 || message.error_code == 17) {
          if (
            this.applyServerTime(
              bigStringInt(messageId)
                .shiftRight(32)
                .toString(10)
            )
          ) {
            console.log('Update session');
            this.updateSession();
          }
          this.sendEncryptedRequest(this.sentMessages[message.bad_msg_id]);
          this.ackMessage(messageId);
        }
        break;

      case 'message':
        this.ackMessage(messageId);
        this.processMessage(message.body, message.msg_id);
        break;

      case 'new_session_created':
        this.ackMessage(messageId);

        this.processMessageAck(message.first_msg_id);
        this.setServerSalt(longToBytes(message.server_salt));

        break;

      case 'msgs_ack':
        for (var i = 0; i < message.msg_ids.length; i++) {
          this.processMessageAck(message.msg_ids[i]);
        }
        break;

      case 'msg_detailed_info':
        //console.log('msg_detailed_info', message);
        break;
      /* if (!this.sentMessages[message.msg_id]) {
       *   this.ackMessage(message.answer_msg_id)
       *   break
       * } */
      case 'msg_new_detailed_info':
        //console.log('msg_detailed_info', message);
        break;
      /* if (this.pendingAcks.indexOf(message.answer_msg_id)) {
       *   break
       * }
       * this.reqResendMessage(message.answer_msg_id)
       * break */

      case 'msgs_state_info':
        this.ackMessage(message.answer_msg_id);
        console.log('msgs_state_info', message);
        /* if (this.lastResendReq && this.lastResendReq.req_msg_id == message.req_msg_id && this.pendingResends.length) {
         *   var i, badMsgId, pos
         *   for (i = 0; i < this.lastResendReq.resend_msg_ids.length; i++) {
         *     badMsgId = this.lastResendReq.resend_msg_ids[i]
         *     pos = this.pendingResends.indexOf(badMsgId)
         *     if (pos != -1) {
         *       this.pendingResends.splice(pos, 1)
         *     }
         *   }
         * } */
        break;

      case 'rpc_result':
        const sentMessageId = message.req_msg_id;

        this.ackMessage(messageId);

        this.processMessageAck(sentMessageId);
        if (this.sentMessages[sentMessageId]) {
          const { deferred } = this.sentMessages[sentMessageId];

          deferred.resolve(message);

          delete this.sentMessages[sentMessageId];
        }
        break;

      default:
        console.log('default', message);
        this.ackMessage(messageId);
        this.emit(message._, message);
        // console.log('processMessage', message, messageId);
        break;
    }
  }

  ackMessage(messageId) {
    // console.log('ackMessage[messageId]:', messageId);

    this.pendingAcks.push(messageId);
  }

  processMessageAck(messageId) {
    const sentMessage = this.sentMessages[messageId];
    if (sentMessage && !sentMessage.acked) {
      delete sentMessage.body;
      sentMessage.acked = true;

      return true;
    }

    return false;
  }

  applyServerTime(serverTime) {
    const newTimeOffset = serverTime - Math.floor(this.localTime / 1000);
    const changed = Math.abs(this.timeOffset - newTimeOffset) > 10;

    this.lastMessageId = [0, 0];
    this.timeOffset = newTimeOffset;

    console.log(
      'Apply server time',
      serverTime,
      this.localTime,
      newTimeOffset,
      changed
    );

    return changed;
  }

  updateSession() {
    this.prevSessionId = this.sessionId;
    this.sessionId = new Array(8);
    secureRandom.nextBytes(this.sessionId);
    this._seqNo = 0;
  }

  getMsgKey(authKeyUint8, dataWithPadding, isOut) {
    var authKey = authKeyUint8;
    var x = isOut ? 0 : 8;
    var msgKeyLargePlain = bufferConcat(
      authKey.subarray(88 + x, 88 + x + 32),
      dataWithPadding
    );
    const msgKeyLarge = sha256HashSync(msgKeyLargePlain);
    return new Uint8Array(msgKeyLarge).subarray(8, 24);
  }

  generateSeqNo(notContentRelated) {
    var seqNo = this._seqNo * 2;

    if (!notContentRelated) {
      seqNo += 1;
      this._seqNo += 1;
    }

    return seqNo;
  }

  generateMessageId() {
    const timeTicks = tsNow();
    const timeSec = Math.floor(timeTicks / 1000) + this.timeOffset;
    const timeMSec = timeTicks % 1000;
    const random = nextRandomInt(0xffff);

    const { lastMessageId } = this;

    let messageId = [timeSec, (timeMSec << 21) | (random << 3) | 4];

    if (
      lastMessageId[0] > messageId[0] ||
      (lastMessageId[0] == messageId[0] && lastMessageId[1] >= messageId[1])
    ) {
      messageId = [lastMessageId[0], lastMessageId[1] + 4];
    }

    this.lastMessageId = messageId;

    return longFromInts(messageId[0], messageId[1]);
  }

  getServerSalt() {
    const key = `dc${this.dcId}ServerSalt`;

    const fromThis = this[key];

    if (fromThis) {
      return fromThis;
    }

    const fromStorage = localStorage.getItem(key);

    if (fromStorage) {
      return JSON.parse(fromStorage);
    }

    return null;
  }

  setServerSalt(serverSalt) {
    const key = `dc${this.dcId}ServerSalt`;
    this[key] = serverSalt;

    localStorage.setItem(key, JSON.stringify(serverSalt));
  }

  getAuthKey() {
    const key = `dc${this.dcId}AuthKey`;

    const fromThis = this[key];

    if (fromThis) {
      return fromThis;
    }

    const fromStorage = localStorage.getItem(key);

    if (fromStorage) {
      return JSON.parse(fromStorage);
    }

    return null;
  }

  setAuthKey(authKey) {
    const key = `dc${this.dcId}AuthKey`;
    this[key] = authKey;

    localStorage.setItem(key, JSON.stringify(authKey));
  }

  setDc(dcId) {
    const fromStorage = localStorage.getItem('dcId', dcId);
    this.dcId = dcId || fromStorage || 2;
    localStorage.setItem('dcId', this.dcId);

    const subdomainsMap = {
      1: 'pluto',
      2: 'venus',
      3: 'aurora',
      4: 'vesta',
      5: 'flora',
    };

    const ipMap = this.test
      ? {
          1: '149.154.175.10',
          2: '149.154.167.40',
          3: '149.154.175.117',
        }
      : {
          1: '149.154.175.50',
          2: '149.154.167.51',
          3: '149.154.175.100',
          4: '149.154.167.91',
          5: '149.154.171.5',
        };

    const urlPath = this.test ? '/apiw_test1' : '/apiw1';

    if (this.https) {
      this.url = `https://${
        subdomainsMap[this.dcId]
      }.web.telegram.org${urlPath}`;
    } else {
      this.url = `http://${ipMap[this.dcId]}${urlPath}`;
    }
  }

  runLongPoll() {
    if (this.longPollRunning) {
      return;
    }
    this.longPollRunning = true;

    const longPollInner = () => {
      const serializer = new TLSerializer({ mtproto: true });
      serializer.method('http_wait', {
        max_delay: 500,
        wait_after: 150,
        max_wait: 15000,
      });

      const message = {
        msg_id: this.generateMessageId(),
        seq_no: this.generateSeqNo(),
        body: serializer.getBytes(),
      };

      this.sendEncryptedRequest(message).finally(longPollInner);
    };

    longPollInner();
  }

  getApiCallMessage(method, params = {}) {
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
      api_hash: this.api_hash,
      api_id: this.api_id,
      ...params,
    });

    const message = {
      msg_id: this.generateMessageId(),
      seq_no: this.generateSeqNo(),
      body: serializer.getTypedBytes(),
      isAPI: true,
      method,
    };

    return message;
  }

  innerCall(method, params) {
    return this.init().then(() => {
      const message = this.getApiCallMessage(method, params);
      this.sendAcks();

      return new Promise((resolve, reject) => {
        this.sendEncryptedRequest(message)
          .then(response => {
            const { messageDeferred } = response;
            messageDeferred.then(message => {
              if (message.result._ === 'rpc_error') {
                reject(message.result);
              } else {
                resolve(message.result);
              }
            });
          })
          .catch(reject);
      });
    });
  }

  call(method, params) {
    return this.innerCall(method, params).catch(error => {
      console.log(`error:`, error);
      const { error_message } = error;

      if (error_message.includes('_MIGRATE_')) {
        const [_type, dcId] = error_message.split('_MIGRATE_');

        this.setDc(dcId);

        return this.call(method, params);
      }

      throw error;
    });
  }

  checkPassword(password) {
    return this.call('account.getPassword').then(async result => {
      const { srp_id, current_algo, secure_random, srp_B } = result;
      const { salt1, salt2, g, p } = current_algo;

      const { A, M1 } = await getSRPParams({
        g,
        p,
        salt1,
        salt2,
        gB: srp_B,
        password,
      });

      return this.call('auth.checkPassword', {
        password: {
          _: 'inputCheckPasswordSRP',
          srp_id,
          A,
          M1,
        },
      });
    });
  }

  getFileInBase64({ location, offset = 0, limit = 1024 * 1024 }) {
    return this.call('upload.getFile', {
      flags: 0,
      offset,
      limit,
      location,
    }).then(response => {
      return arrayBufferToBase64(response.bytes);
    });
  }
}

class MTProto {
  constructor({ api_id, api_hash, test = false, https = false }) {
    this.api = new API({ api_id, api_hash, test, https });
  }
}

module.exports = MTProto;
