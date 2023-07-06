const sha256 = require("fast-sha256");

async function PBKDF2(password, salt, iterations) {
  return sha256.pbkdf2(password, salt, iterations, 512);
}

module.exports = PBKDF2;
