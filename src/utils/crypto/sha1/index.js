const crypto = require('crypto');

async function SHA1(data) {
  data = new Uint8Array(data);

  const hash = crypto.createHash('sha1');

  hash.update(data);

  return new Uint8Array(hash.digest());
}

module.exports = SHA1;
