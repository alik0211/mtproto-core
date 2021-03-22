const crypto = require('crypto');

function getRandomBytes(length) {
  return new Uint8Array(crypto.randomBytes(length));
}

module.exports = getRandomBytes;
