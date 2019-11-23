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

module.exports = {
  call(method, data) {
    return authorize().then(() => {
      return apiCall(method, {
        api_hash: config.app.api_hash,
        api_id: config.app.api_id,
        ...data,
      });
    });
  },
};
