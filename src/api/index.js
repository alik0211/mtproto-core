const debounce = require('lodash.debounce');
const http = require('../transport');
const config = require('../config');
const { BigInteger, SecureRandom } = require('../vendors/jsbn');
const { TLSerialization, TLDeserialization } = require('../tl');
const {
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
} = require('../utils');
const RsaKeysManager = require('../utils/rsa');

const authStorageKey = '__mtproto-auth';

let authObject = {};

let server_time_offset = 0;

function tsNow(seconds) {
  var t = +new Date() + (window.tsOffset || 0);
  return seconds ? Math.floor(t / 1000) : t;
}

const secureRandom = new SecureRandom();

const chromeMatches = navigator.userAgent.match(/Chrome\/(\d+(\.\d+)?)/);
const chromeVersion = (chromeMatches && parseFloat(chromeMatches[1])) || false;
const xhrSendBuffer =
  !('ArrayBufferView' in window) && chromeVersion > 0 && chromeVersion < 30;

function Deferred() {
  this.resolve = null;
  this.reject = null;
  this.promise = new Promise(
    function(resolve, reject) {
      this.resolve = resolve;
      this.reject = reject;
    }.bind(this)
  );
  Object.freeze(this);
}

// Copied from zhukov/webogram with slight changes:

function mtpSendSetClientDhParams(auth) {
  //deferred
  return new Promise(function(resolve, reject) {
    var gBytes = bytesFromHex(auth.g.toString(16));

    auth.b = new Array(256);
    secureRandom.nextBytes(auth.b);

    const gB = bytesModPow(gBytes, auth.b, auth.dhPrime);
    var data = new TLSerialization({ mtproto: true });
    data.storeObject(
      {
        _: 'client_DH_inner_data',
        nonce: auth.nonce,
        server_nonce: auth.serverNonce,
        retry_id: [0, auth.retry++],
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

    var request = new TLSerialization({ mtproto: true });
    request.storeMethod('set_client_DH_params', {
      nonce: auth.nonce,
      server_nonce: auth.serverNonce,
      encrypted_data: encryptedData,
    });

    console.log('Send set_client_DH_params');
    sendPlainRequest(request.getBuffer())
      .then(function(deserializer) {
        var response = deserializer.fetchObject('Set_client_DH_params_answer');

        if (
          response._ != 'dh_gen_ok' &&
          response._ != 'dh_gen_retry' &&
          response._ != 'dh_gen_fail'
        ) {
          reject(
            new Error(
              '[MT] Set_client_DH_params_answer response invalid: ' + response._
            )
          );
          return false;
        }

        if (!bytesCmp(auth.nonce, response.nonce)) {
          reject(new Error('[MT] Set_client_DH_params_answer nonce mismatch'));
          return false;
        }

        if (!bytesCmp(auth.serverNonce, response.server_nonce)) {
          reject(
            new Error('[MT] Set_client_DH_params_answer server_nonce mismatch')
          );
          return false;
        }

        const authKey = bytesModPow(auth.gA, auth.b, auth.dhPrime);
        var authKeyHash = sha1BytesSync(authKey),
          authKeyAux = authKeyHash.slice(0, 8),
          authKeyID = authKeyHash.slice(-8);

        console.log('Got Set_client_DH_params_answer', response._, response);
        switch (response._) {
          case 'dh_gen_ok':
            var newNonceHash1 = sha1BytesSync(
              auth.newNonce.concat([1], authKeyAux)
            ).slice(-16);

            if (!bytesCmp(newNonceHash1, response.new_nonce_hash1)) {
              reject(
                new Error(
                  '[MT] Set_client_DH_params_answer new_nonce_hash1 mismatch'
                )
              );
              return false;
            }

            var serverSalt = bytesXor(
              auth.newNonce.slice(0, 8),
              auth.serverNonce.slice(0, 8)
            );
            console.log('Auth successfull!', authKeyID, authKey, serverSalt);

            auth.authKeyID = authKeyID;
            auth.authKey = authKey;
            auth.serverSalt = serverSalt;

            resolve(auth);
            break;

          case 'dh_gen_retry':
            var newNonceHash2 = sha1BytesSync(
              auth.newNonce.concat([2], authKeyAux)
            ).slice(-16);
            if (!bytesCmp(newNonceHash2, response.new_nonce_hash2)) {
              reject(
                new Error(
                  '[MT] Set_client_DH_params_answer new_nonce_hash2 mismatch'
                )
              );
              return false;
            }

            return mtpSendSetClientDhParams(auth);

          case 'dh_gen_fail':
            var newNonceHash3 = sha1BytesSync(
              auth.newNonce.concat([3], authKeyAux)
            ).slice(-16);
            if (!bytesCmp(newNonceHash3, response.new_nonce_hash3)) {
              reject(
                new Error(
                  '[MT] Set_client_DH_params_answer new_nonce_hash3 mismatch'
                )
              );
              return false;
            }

            reject(new Error('[MT] Set_client_DH_params_answer fail'));
            return false;
        }
      })
      .catch(reject);
  });
}

function getNonce() {
  const nonce = [];
  for (var i = 0; i < 16; i++) {
    nonce.push(nextRandomInt(0xff));
  }
  return nonce;
}

let lastMessageID = [0, 0];
function setLastMessageID(messageID) {
  lastMessageID = messageID;
}

var timeOffset = 0;
function setTimeOffset(newTimeOffset) {
  timeOffset = newTimeOffset;
}
function getTimeOffset() {
  return timeOffset;
}

function applyServerTime(serverTime) {
  var newTimeOffset =
    serverTime - Math.floor((authObject.localTime || tsNow()) / 1000);
  var changed = Math.abs(getTimeOffset() - newTimeOffset) > 10;

  lastMessageID = [0, 0];
  timeOffset = newTimeOffset;
  server_time_offset = newTimeOffset;

  console.log(
    'Apply server time',
    serverTime,
    authObject.localTime,
    newTimeOffset,
    changed
  );

  return changed;
}

function generateMessageID() {
  var timeTicks = tsNow(),
    timeSec = Math.floor(timeTicks / 1000) + timeOffset,
    timeMSec = timeTicks % 1000,
    random = nextRandomInt(0xffff);

  var messageID = [timeSec, (timeMSec << 21) | (random << 3) | 4];
  if (
    lastMessageID[0] > messageID[0] ||
    (lastMessageID[0] == messageID[0] && lastMessageID[1] >= messageID[1])
  ) {
    messageID = [lastMessageID[0], lastMessageID[1] + 4];
  }

  lastMessageID = messageID;

  return longFromInts(messageID[0], messageID[1]);
}

let url = null;

function sendPlainRequest(requestBuffer) {
  const requestLength = requestBuffer.byteLength;
  const requestArray = new Int32Array(requestBuffer);

  const header = new TLSerialization();
  header.storeLongP(0, 0, 'auth_key_id');
  header.storeLong(generateMessageID(), 'msg_id');
  header.storeInt(requestLength, 'request_length');

  const headerBuffer = header.getBuffer();
  const headerArray = new Int32Array(headerBuffer);
  const headerLength = headerBuffer.byteLength;

  const resultBuffer = new ArrayBuffer(headerLength + requestLength);
  const resultArray = new Int32Array(resultBuffer);

  resultArray.set(headerArray);
  resultArray.set(requestArray, headerArray.length);

  const requestData = xhrSendBuffer ? resultBuffer : resultArray;
  let requestPromise;
  return http
    .post(url, requestData, {
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
    })
    .catch(e => {
      console.error('catched', e);
    });
}

var _seqNo = 0;
function generateSeqNo(notContentRelated) {
  var seqNo = _seqNo * 2;

  if (!notContentRelated) {
    seqNo++;
    _seqNo++;
  }

  return seqNo;
}

let sessionID, prevSessionID;
function updateSession() {
  prevSessionID = sessionID;
  sessionID = new Array(8);
  secureRandom.nextBytes(sessionID);
  _seqNo = 0;
}

updateSession();

function applyServerSalt(salt) {
  authObject.serverSalt = longToBytes(salt);
  saveAuth(authObject);
}

const sentMessages = {};

function _sendEncryptedRequest(message) {
  const authKey = authObject.authKey;
  const authKeyUint8 = convertToUint8Array(authKey);
  const authKeyID = sha1BytesSync(authKey).slice(-8);
  const serverSalt = authObject.serverSalt;

  var data = new TLSerialization({
    startMaxLength: message.body.length + 2048,
  });

  message.deferred = message.deferred || new Deferred();
  sentMessages[message.msg_id] = message;

  data.storeIntBytes(serverSalt, 64, 'salt');
  data.storeIntBytes(sessionID, 64, 'session_id');

  data.storeLong(message.msg_id, 'message_id');
  data.storeInt(message.seq_no, 'seq_no');

  data.storeInt(message.body.length, 'message_data_length');
  data.storeRawBytes(message.body, 'message_data');

  var dataBuffer = data.getBuffer();

  var paddingLength = 16 - (data.offset % 16) + 16 * (1 + nextRandomInt(5));
  var padding = new Array(paddingLength);
  secureRandom.nextBytes(padding);

  var dataWithPadding = bufferConcat(dataBuffer, padding);

  const encryptedResult = getEncryptedMessage(dataWithPadding, authKeyUint8);

  //console.log('encryptedResult.msgKey', encryptedResult.msgKey, dHexDump(encryptedResult.msgKey));

  var request = new TLSerialization({
    startMaxLength: encryptedResult.bytes.byteLength + 256,
  });
  request.storeIntBytes(authKeyID, 64, 'auth_key_id');
  request.storeIntBytes(encryptedResult.msgKey, 128, 'msg_key');
  request.storeRawBytes(encryptedResult.bytes, 'encrypted_data');

  var requestData = xhrSendBuffer ? request.getBuffer() : request.getArray();

  return new Promise(function(resolve, reject) {
    const request = http
      .post(url, requestData, {
        responseType: 'arraybuffer',
        transformRequest: null,
      })
      .then(function(result) {
        if (!result.data || !result.data.byteLength) {
          throw new Error('no data');
        }

        const responseBuffer = result.data;

        var responseDeserializer = new TLDeserialization(responseBuffer);

        const serverAuthKeyID = responseDeserializer.fetchIntBytes(
          64,
          false,
          'auth_key_id'
        );
        if (!bytesCmp(serverAuthKeyID, authKeyID)) {
          throw new Error(
            '[MT] Invalid server auth_key_id: ' + bytesToHex(serverAuthKeyID)
          );
        }
        var msgKey = responseDeserializer.fetchIntBytes(128, true, 'msg_key');
        var encryptedData = responseDeserializer.fetchRawBytes(
          responseBuffer.byteLength - responseDeserializer.getOffset(),
          true,
          'encrypted_data'
        );

        const dataWithPadding = getDecryptedMessage(
          authKeyUint8,
          msgKey,
          encryptedData
        );
        const calcMsgKey = getMsgKey(authKeyUint8, dataWithPadding, false);

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
        var serverSessionID = dataDeserializer.fetchIntBytes(
          64,
          false,
          'session_id'
        );
        var messageID = dataDeserializer.fetchLong('message_id');

        if (
          !bytesCmp(serverSessionID, sessionID) &&
          (!prevSessionID || !bytesCmp(sessionID, prevSessionID))
        ) {
          console.warn('Sessions', serverSessionID, sessionID, prevSessionID);
          throw new Error(
            '[MT] Invalid server session_id: ' + bytesToHex(serverSessionID)
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

              var sentMessage = sentMessages[result.req_msg_id];
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

        /* console.log('send encrypted request result', {
         *   response,
         *   messageID,
         *   sessionID,
         *   seqNo
         * }); */

        resolve({
          response,
          messageID,
          sessionID,
          seqNo,
          messageDeferred: message.deferred.promise,
        });
      })
      .catch(e => {
        console.error('send encrypted request error', e);
        /* reAuth().then(auth => {
          authObject = auth;
          // recursion
          _sendEncryptedRequest(message).then(result => {
            resolve(result);
          });
        }).catch(reject); */
      });
  });
}

function getMsgKey(authKeyUint8, dataWithPadding, isOut) {
  var authKey = authKeyUint8;
  var x = isOut ? 0 : 8;
  var msgKeyLargePlain = bufferConcat(
    authKey.subarray(88 + x, 88 + x + 32),
    dataWithPadding
  );
  const msgKeyLarge = sha256HashSync(msgKeyLargePlain);
  return new Uint8Array(msgKeyLarge).subarray(8, 24);
}

function getAesKeyIv(authKeyUint8, msgKey, isOut) {
  var authKey = authKeyUint8;
  var x = isOut ? 0 : 8;
  var sha2aText = new Uint8Array(52);
  var sha2bText = new Uint8Array(52);
  var promises = {};

  sha2aText.set(msgKey, 0);
  sha2aText.set(authKey.subarray(x, x + 36), 16);
  //const sha2a = sha256HashSync(sha2aText);

  sha2bText.set(authKey.subarray(40 + x, 40 + x + 36), 0);
  sha2bText.set(msgKey, 36);
  //const sha2b = sha256HashSync(sha2bText);

  var aesKey = new Uint8Array(32);
  var aesIv = new Uint8Array(32);
  var sha2a = new Uint8Array(sha256HashSync(sha2aText));
  var sha2b = new Uint8Array(sha256HashSync(sha2bText));

  aesKey.set(sha2a.subarray(0, 8));
  aesKey.set(sha2b.subarray(8, 24), 8);
  aesKey.set(sha2a.subarray(24, 32), 24);

  aesIv.set(sha2b.subarray(0, 8));
  aesIv.set(sha2a.subarray(8, 24), 8);
  aesIv.set(sha2b.subarray(24, 32), 24);

  return [aesKey, aesIv];
}

function getEncryptedMessage(dataWithPadding, authKeyUint8) {
  const msgKey = getMsgKey(authKeyUint8, dataWithPadding, true);
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

function getDecryptedMessage(authKeyUint8, msgKey, encryptedData) {
  const keyIv = getAesKeyIv(authKeyUint8, msgKey, false);
  return convertToArrayBuffer(
    aesDecryptSync(encryptedData, keyIv[0], keyIv[1])
  );
}

function reAuth() {
  localStorage.removeItem(authStorageKey);
  return authorize();
}

function saveAuth(auth) {
  authObject = auth;
  localStorage.setItem(authStorageKey, JSON.stringify(auth));
}

function processMessage(message, messageID) {
  console.log('processMessage', message, messageID);
  let sentMessage;
  switch (message._) {
    case 'msg_container':
      var len = message.messages.length;
      for (var i = 0; i < len; i++) {
        processMessage(message.messages[i], message.messages[i].msg_id);
      }
      break;

    case 'bad_server_salt':
      console.log('Bad server salt');
      sentMessage = sentMessages[message.bad_msg_id];
      if (!sentMessage || sentMessage.seq_no != message.bad_msg_seqno) {
        console.log(message.bad_msg_id, message.bad_msg_seqno);
        throw new Error('[MT] Bad server salt for invalid message');
      }

      applyServerSalt(message.new_server_salt);
      sendEncryptedRequest(sentMessages[message.bad_msg_id]);
      ackMessage(messageID);
      break;

    case 'bad_msg_notification':
      console.log('Bad msg notification', message);
      sentMessage = sentMessages[message.bad_msg_id];
      if (!sentMessage || sentMessage.seq_no != message.bad_msg_seqno) {
        console.log(message.bad_msg_id, message.bad_msg_seqno);
        throw new Error('[MT] Bad msg notification for invalid message');
      }

      if (message.error_code == 16 || message.error_code == 17) {
        if (
          applyServerTime(
            bigStringInt(messageID)
              .shiftRight(32)
              .toString(10)
          )
        ) {
          console.log('Update session');
          updateSession();
        }
        sendEncryptedRequest(sentMessages[message.bad_msg_id]);
        ackMessage(messageID);
      }
      break;

    case 'message':
      ackMessage(messageID);
      processMessage(message.body, message.msg_id);
      break;

    case 'new_session_created':
      ackMessage(messageID);

      processMessageAck(message.first_msg_id);
      applyServerSalt(message.server_salt);

      break;

    case 'msgs_ack':
      for (var i = 0; i < message.msg_ids.length; i++) {
        processMessageAck(message.msg_ids[i]);
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
      ackMessage(message.answer_msg_id);
      console.log('msgs_state_info', message);
      /* if (this.lastResendReq && this.lastResendReq.req_msg_id == message.req_msg_id && this.pendingResends.length) {
       *   var i, badMsgID, pos
       *   for (i = 0; i < this.lastResendReq.resend_msg_ids.length; i++) {
       *     badMsgID = this.lastResendReq.resend_msg_ids[i]
       *     pos = this.pendingResends.indexOf(badMsgID)
       *     if (pos != -1) {
       *       this.pendingResends.splice(pos, 1)
       *     }
       *   }
       * } */
      break;

    case 'rpc_result':
      const sentMessageID = message.req_msg_id;

      //console.log('res', message);

      ackMessage(messageID);

      processMessageAck(sentMessageID);
      if (sentMessages[sentMessageID]) {
        const deferred = sentMessages[sentMessageID].deferred;
        if (message.result._ == 'rpc_error') {
          console.log('Rpc error', message.result);
          deferred.reject(message.result);
        } else {
          var dRes = message.result._;
          if (!dRes) {
            if (message.result.length > 5) {
              dRes = '[..' + message.result.length + '..]';
            } else {
              dRes = message.result;
            }
          }
          //console.log('Rpc response', dRes)
          deferred.resolve(message.result);
        }

        delete sentMessages[sentMessageID];
      }
      break;

    default:
      ackMessage(messageID);
      //console.log('default', message);
      break;
  }
}

function processMessageAck(messageID) {
  const sentMessage = sentMessages[messageID];
  if (sentMessage && !sentMessage.acked) {
    delete sentMessage.body;
    sentMessage.acked = true;

    return true;
  }

  return false;
}

let pendingAcks = [];

const longPollMaxWait = 15000;

const sendAcks = debounce(function() {
  if (!pendingAcks.length) {
    return;
  }

  //console.error('pending acks', pendingAcks);

  var waitSerializer = new TLSerialization({ mtproto: true });
  waitSerializer.storeMethod('http_wait', {
    max_delay: 500,
    wait_after: 150,
    max_wait: 1000,
  });
  const waitMessage = {
    msg_id: generateMessageID(),
    seq_no: generateSeqNo(),
    body: waitSerializer.getBytes(),
  };

  const serializer = new TLSerialization({ mtproto: true });
  serializer.storeObject({ _: 'msgs_ack', msg_ids: pendingAcks }, 'Object');

  const message = {
    msg_id: generateMessageID(),
    seq_no: generateSeqNo(true),
    body: serializer.getBytes(),
  };

  pendingAcks = [];

  sendEncryptedRequest([waitMessage, message]);
}, 500);

function ackMessage(messageID) {
  //console.log('ack', messageID);

  pendingAcks.push(messageID);
}

function sendEncryptedRequest(messages) {
  //console.log('send req', messages.length)

  if (!(messages instanceof Array)) {
    messages = [messages];
  }
  function send(message) {
    return _sendEncryptedRequest(message).then(responsePackage => {
      ///console.error('responsePackage', responsePackage)
      const { response, messageID } = responsePackage;
      processMessage(response, messageID);
      sendAcks();
      return responsePackage;
    });
  }
  // do buffering
  if (messages.length === 1) {
    return send(messages[0]);
  } else {
    const messagesByteLen = messages.reduce(
      (acc, message) =>
        acc + (message.body.byteLength || message.body.length) + 32,
      0
    );
    //create container;
    var container = new TLSerialization({
      mtproto: true,
      startMaxLength: messagesByteLen + 64,
    });
    container.storeInt(0x73f1f8dc, 'CONTAINER[id]');
    container.storeInt(messages.length, 'CONTAINER[count]');
    var onloads = [];
    var innerMessages = [];
    for (var i = 0; i < messages.length; i++) {
      container.storeLong(messages[i].msg_id, 'CONTAINER[' + i + '][msg_id]');
      innerMessages.push(messages[i].msg_id);

      /* sentMessages[messages[i].msg_id] = messages[i];
       * sentMessages[messages[i].msg_id].inContainer = true; */

      container.storeInt(messages[i].seq_no, 'CONTAINER[' + i + '][seq_no]');
      container.storeInt(
        messages[i].body.length,
        'CONTAINER[' + i + '][bytes]'
      );
      container.storeRawBytes(messages[i].body, 'CONTAINER[' + i + '][body]');
      /* if (messages[i].noResponse) {
       *   //noResponseMsgs.push(messages[i].msg_id);
       * } */
    }

    const containerSentMessage = {
      msg_id: generateMessageID(),
      seq_no: generateSeqNo(true),
      container: true,
      inner: innerMessages,
    };

    const message = {
      ...{ body: container.getBytes(true) },
      ...containerSentMessage,
    };

    sentMessages[message.msg_id] = containerSentMessage;

    return send(message);
  }
}

class Auth {
  constructor() {
    this.longPollRunning = false;
  }

  init() {
    try {
      const prevAuth = localStorage.getItem(authStorageKey);
      if (prevAuth) {
        authObject = JSON.parse(prevAuth);
        this.runLongPoll();
        return Promise.resolve(authObject);
      }
    } catch (e) {
      console.error(e);
    }

    return new Promise((resolve, reject) => {
      const nonce = getNonce();
      const request = new TLSerialization({ mtproto: true });
      request.storeMethod('req_pq_multi', { nonce });
      // request.storeMethod('req_pq', { nonce });
      sendPlainRequest(request.getBuffer()).then(deserializer => {
        const responsePQ = deserializer.fetchObject('ResPQ');
        console.log('2. response', responsePQ);

        if (responsePQ._ != 'resPQ') {
          reject(new Error('[MT] resPQ response invalid: ' + responsePQ._));
        }

        if (!bytesCmp(nonce, responsePQ.nonce)) {
          reject(new Error('[MT] resPQ nonce mismatch'));
        }

        authObject.nonce = nonce;
        authObject.serverNonce = responsePQ.server_nonce;
        authObject.pq = responsePQ.pq;
        authObject.fingerprints = responsePQ.server_public_key_fingerprints;

        // console.log(
        //   'Got ResPQ',
        //   bytesToHex(authObject.serverNonce),
        //   bytesToHex(authObject.pq),
        //   authObject.fingerprints
        // );

        authObject.publicKey = RsaKeysManager.select(authObject.fingerprints);

        if (!authObject.publicKey) {
          reject(new Error('[MT] No public key found'));
        }

        // console.log('PQ factorization start', authObject.pq);

        const pAndQ = pqPrimeFactorization(authObject.pq);

        authObject.p = pAndQ[0];
        authObject.q = pAndQ[1];

        //mtpSendReqDhParams(authObject);
        authObject.newNonce = new Array(32);
        secureRandom.nextBytes(authObject.newNonce);

        // console.log('auth now', authObject);

        const data = new TLSerialization({ mtproto: true });
        data.storeObject(
          {
            _: 'p_q_inner_data',
            pq: authObject.pq,
            p: authObject.p,
            q: authObject.q,
            nonce: authObject.nonce,
            server_nonce: authObject.serverNonce,
            new_nonce: authObject.newNonce,
          },
          'P_Q_inner_data',
          'DECRYPTED_DATA'
        );

        const dataWithHash = sha1BytesSync(data.getBuffer()).concat(
          data.getBytes()
        );

        const request = new TLSerialization({ mtproto: true });
        request.storeMethod('req_DH_params', {
          nonce: authObject.nonce,
          server_nonce: authObject.serverNonce,
          p: authObject.p,
          q: authObject.q,
          public_key_fingerprint: authObject.publicKey.fingerprint,
          encrypted_data: rsaEncrypt(authObject.publicKey, dataWithHash),
        });

        sendPlainRequest(request.getBuffer()).then(deserializer => {
          const responseDH = deserializer.fetchObject(
            'Server_DH_Params',
            'RESPONSE'
          );
          console.log('3. responseDH', responseDH);

          if (
            responseDH._ != 'server_DH_params_fail' &&
            responseDH._ != 'server_DH_params_ok'
          ) {
            reject(
              new Error(
                '[MT] Server_DH_Params response invalid: ' + responseDH._
              )
            );
          }

          if (!bytesCmp(authObject.nonce, responseDH.nonce)) {
            reject(new Error('[MT] Server_DH_Params nonce mismatch'));
          }

          if (!bytesCmp(authObject.serverNonce, responseDH.server_nonce)) {
            reject(new Error('[MT] Server_DH_Params server_nonce mismatch'));
          }

          if (responseDH._ == 'server_DH_params_fail') {
            var newNonceHash = sha1BytesSync(authObject.newNonce).slice(-16);
            if (!bytesCmp(newNonceHash, responseDH.new_nonce_hash)) {
              reject(
                new Error('[MT] server_DH_params_fail new_nonce_hash mismatch')
              );
            }
            reject(new Error('[MT] server_DH_params_fail'));
          }

          //mtpDecryptServerDhDataAnswer(authObject, responseDH.encrypted_answer);

          authObject.localTime = tsNow();

          authObject.tmpAesKey = sha1BytesSync(
            authObject.newNonce.concat(authObject.serverNonce)
          ).concat(
            sha1BytesSync(
              authObject.serverNonce.concat(authObject.newNonce)
            ).slice(0, 12)
          );
          authObject.tmpAesIv = sha1BytesSync(
            authObject.serverNonce.concat(authObject.newNonce)
          )
            .slice(12)
            .concat(
              sha1BytesSync(
                [].concat(authObject.newNonce, authObject.newNonce)
              ),
              authObject.newNonce.slice(0, 4)
            );

          const answerWithHash = aesDecryptSync(
            responseDH.encrypted_answer,
            authObject.tmpAesKey,
            authObject.tmpAesIv
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
            reject(
              new Error(
                '[MT] server_DH_inner_data response invalid: ' + constructor
              )
            );
          }

          if (!bytesCmp(authObject.nonce, responseDHInner.nonce)) {
            reject(new Error('[MT] server_DH_inner_data nonce mismatch'));
          }

          if (!bytesCmp(authObject.serverNonce, responseDHInner.server_nonce)) {
            reject(new Error('[MT] server_DH_inner_data serverNonce mismatch'));
          }

          console.log('5. Done decrypting answer');

          authObject.g = responseDHInner.g;
          authObject.dhPrime = responseDHInner.dh_prime;
          authObject.gA = responseDHInner.g_a;
          authObject.serverTime = responseDHInner.server_time;
          authObject.retry = 0;

          console.log('6. verifyDhParams start');
          this.verifyDhParams(authObject.g, authObject.dhPrime, authObject.gA);
          console.log('7. verifyDhParams finish');

          var offset = deserializer.getOffset();

          if (
            !bytesCmp(hash, sha1BytesSync(answerWithPadding.slice(0, offset)))
          ) {
            reject(new Error('[MT] server_DH_inner_data SHA1-hash mismatch'));
          }

          applyServerTime(authObject.serverTime);
          mtpSendSetClientDhParams(authObject).then(() => {
            console.log('8. authObject', authObject);
            resolve(authObject);
          });
        });
      });
    }).then(auth => {
      saveAuth(auth);
      this.runLongPoll();
      return auth;
    });
  }

  verifyDhParams(g, dhPrime, gA) {
    console.log('Verifying DH params');
    var dhPrimeHex = bytesToHex(dhPrime);
    if (
      g != 3 ||
      dhPrimeHex !==
        'c71caeb9c6b1c9048e6c522f70f13f73980d40238e3e21c14934d037563d930f48198a0aa7c14058229493d22530f4dbfa336f6e0ac925139543aed44cce7c3720fd51f69458705ac68cd4fe6b6b13abdc9746512969328454f18faf8c595f642477fe96bb2a941d5bcd1d4ac8cc49880708fa9b378e3c4f3a9060bee67cf9a4a4a695811051907e162753b56b0f6b410dba74d8a84b2a14b3144e0ef1284754fd17ed950d5965b4b9dd46582db1178d169c6bc465b0d6ff9ca3928fef5b9ae4e418fc15e83ebea0f87fa9ff5eed70050ded2849f47bf959d956850ce929851f0d8115f635b105ee2e4e15d04b2454bf6f4fadf034b10403119cd8e3b92fcc5b'
    ) {
      // The verified value is from https://core.telegram.org/mtproto/security_guidelines
      throw new Error('[MT] DH params are not verified: unknown dhPrime');
    }
    console.log('dhPrime cmp OK');

    var gABigInt = new BigInteger(bytesToHex(gA), 16);
    var dhPrimeBigInt = new BigInteger(dhPrimeHex, 16);

    if (gABigInt.compareTo(BigInteger.ONE) <= 0) {
      throw new Error('[MT] DH params are not verified: gA <= 1');
    }

    if (gABigInt.compareTo(dhPrimeBigInt.subtract(BigInteger.ONE)) >= 0) {
      throw new Error('[MT] DH params are not verified: gA >= dhPrime - 1');
    }
    console.log('1 < gA < dhPrime-1 OK');

    var two = new BigInteger(null);
    two.fromInt(2);
    var twoPow = two.pow(2048 - 64);

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

  runLongPoll() {
    if (this.longPollRunning) {
      return;
    }
    this.longPollRunning = true;

    (function longPollInner() {
      //console.log('long poll');
      var serializer = new TLSerialization({ mtproto: true });
      serializer.storeMethod('http_wait', {
        max_delay: 500,
        wait_after: 150,
        max_wait: longPollMaxWait,
      });

      var messageID = generateMessageID();
      var seqNo = generateSeqNo();
      var message = {
        msg_id: messageID,
        seq_no: seqNo,
        body: serializer.getBytes(),
      };

      sendEncryptedRequest(message).finally(longPollInner);
    })();
  }
}

class API {
  constructor({ api_id, api_hash, test, https }) {
    this.api_id = api_id;
    this.api_hash = api_hash;
    this.auth = new Auth();

    const urlPath = test ? '/apiw_test1' : '/apiw1';

    url = https
      ? `https://venus.web.telegram.org${urlPath}`
      : `http://149.154.167.40${urlPath}`;
  }

  getApiCallMessage(method, params = {}, options = {}) {
    const serializer = new TLSerialization(options);

    serializer.storeInt(config.invokeWithLayer, 'invokeWithLayer');
    serializer.storeInt(config.layer, 'layer');
    serializer.storeInt(config.initConnection, 'initConnection');
    serializer.storeInt(this.api_id, 'api_id');
    serializer.storeString(
      navigator.userAgent || 'Unknown UserAgent',
      'device_model'
    );
    serializer.storeString(
      navigator.platform || 'Unknown Platform',
      'system_version'
    );
    serializer.storeString('1.0.0', 'app_version');
    serializer.storeString(navigator.language || 'en', 'system_lang_code');
    serializer.storeString('', 'lang_pack');
    serializer.storeString(navigator.language || 'en', 'lang_code');

    options.resultType = serializer.storeMethod(method, params);

    let toAck = []; //msgs_ack
    const msg_id = generateMessageID();
    const message = {
      msg_id,
      seq_no: generateSeqNo(),
      body: serializer.getBytes(true),
      isAPI: true,
      method,
    };
    const messageByteLength =
      (message.body.byteLength || message.body.length) + 32;

    return message;
  }

  invokeApiCall(method, params = {}, options = {}) {
    const message = this.getApiCallMessage(method, params, options);
    sendAcks();
    return sendEncryptedRequest(message);
  }

  apiCall(method, params = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this.invokeApiCall(method, params, options)
        .then(response => {
          const { messageDeferred } = response;
          messageDeferred.then(resolve);
          messageDeferred.catch(reject);
        })
        .catch(reject);
    });
  }

  call(method, data) {
    return this.auth.init().then(() => {
      return this.apiCall(method, {
        api_hash: this.api_hash,
        api_id: this.api_id,
        ...data,
      });
    });
  }
}

module.exports = API;
