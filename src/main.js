const config = require('./config');
const { authorize, apiCall } = require('./api');

class MTProto {
  constructor({ api_id, api_hash }) {
    config.app.api_id = api_id;
    config.app.api_hash = api_hash;
  }

  call(method, data) {
    return authorize().then(() => {
      return apiCall(method, {
        api_hash: config.app.api_hash,
        api_id: config.app.api_id,
        ...data,
      });
    });
  }
}

module.exports = MTProto;
