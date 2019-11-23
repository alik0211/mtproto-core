const leemon = require('leemon');
const utils = require('./utils');
const config = require('./config');
const { authorize, apiCall } = require('./api');

Object.keys(leemon).forEach(methodName => {
  window[methodName] = leemon[methodName];
});

Object.keys(utils).forEach(methodName => {
  window[methodName] = utils[methodName];
});

window.MTProto = {
  mtp: {
    authorize: authorize,
    apiCall: apiCall,
  },
};

window.MTProto.api = function(method, data) {
  if (Object.keys(data || {}).length > 0) {
    data.api_hash = config.app.api_hash;
    data.api_id = config.app.api_id;
  }

  return MTProto.mtp.authorize().then(() => {
    return MTProto.mtp.apiCall(method, data);
  });
};
