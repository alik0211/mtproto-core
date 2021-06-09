const jsSHA = require("jssha");

async function SHA1(data) {
  const format = data instanceof Uint8Array ? "UINT8ARRAY" : "ARRAYBUFFER";
  const digest = new jsSHA("SHA-1", format)
  digest.update(data)
  return digest.getHash("UINT8ARRAY")
}

module.exports = SHA1;