const API = require('./api');

class MTProto {
  constructor({ api_id, api_hash, test = false }) {
    this.api = new API({ api_id, api_hash, test });
  }
}

module.exports = MTProto;
