const crypto = require('crypto');

async function PBKDF2(password, salt, iterations) {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512');
}

module.exports = PBKDF2;
