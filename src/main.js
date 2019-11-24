const config = require('./config');
const { authorize, apiCall } = require('./api');

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
