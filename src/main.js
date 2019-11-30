const API = require('./api');

class MTProto {
  constructor({ api_id, api_hash }) {
    this.api = new API({ api_id, api_hash });
  }
}

module.exports = MTProto;
