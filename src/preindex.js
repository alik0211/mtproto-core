const Rusha = require('rusha');
const Zlib = require('zlibjs');
const leemon = require('leemon');
const http = require('./transport');
const utils = require('./utils');
const config = require('./config');
const CryptoJS = require('./vendors/crypto-js');
const { BigInteger, SecureRandom } = require('./vendors/jsbn');
const { TLSerialization, TLDeserialization } = require('./tl');

Object.keys(leemon).forEach(methodName => {
  window[methodName] = leemon[methodName];
});

Object.keys(utils).forEach(methodName => {
  window[methodName] = utils[methodName];
});

window.Rusha = Rusha;
window.BigInteger = BigInteger;
window.SecureRandom = SecureRandom;
window.CryptoJS = CryptoJS;
window.Zlib = Zlib;
window.MTProto = {
  config: {
    api_id: config.app.api_id,
    api_hash: config.app.api_hash,
    Schema: {
      MTProto: config.schema.mtproto,
      API: config.schema.api,
    },
    layer: 74,
  },
  helpers: {
    http,
  },
};

window.TLSerialization = TLSerialization;
window.TLDeserialization = TLDeserialization;

// Need window.SecureRandom
const { authorize, apiCall } = require('./api');

window.MTProto.mtp = {
  authorize: authorize,
  apiCall: apiCall,
};

window.MTProto.api = function(method, data) {
  if (Object.keys(data || {}).length > 0) {
    data.api_hash = MTProto.config.api_hash;
    data.api_id = MTProto.config.api_id;
  }

  return MTProto.mtp.authorize().then(() => {
    return MTProto.mtp.apiCall(method, data);
  });
};
