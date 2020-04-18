const crypto = require('crypto');

function getRandomBytes(length) {
  return crypto.randomBytes(length);
}

module.exports = { getRandomBytes };
