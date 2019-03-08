const Rusha = require('rusha');

function sha1BytesSync(bytes) {
  return bytesFromArrayBuffer(sha1HashSync(bytes));
}

function sha1HashSync(bytes) {
  this.rushaInstance = this.rushaInstance || new Rusha(1024 * 1024);

  // console.log(dT(), 'SHA-1 hash start', bytes.byteLength || bytes.length)
  var hashBytes = rushaInstance.rawDigest(bytes).buffer;
  // console.log(dT(), 'SHA-1 hash finish')

  return hashBytes;
}

function bytesFromArrayBuffer(buffer) {
  var len = buffer.byteLength;
  var byteView = new Uint8Array(buffer);
  var bytes = [];

  for (var i = 0; i < len; ++i) {
    bytes[i] = byteView[i];
  }

  return bytes;
}

function bytesToHex(bytes) {
  bytes = bytes || [];
  var arr = [];
  for (var i = 0; i < bytes.length; i++) {
    arr.push((bytes[i] < 16 ? '0' : '') + (bytes[i] || 0).toString(16));
  }
  return arr.join('');
}

function bytesFromHex(hexString) {
  var len = hexString.length,
    i;
  var start = 0;
  var bytes = [];

  if (hexString.length % 2) {
    bytes.push(parseInt(hexString.charAt(0), 16));
    start++;
  }

  for (i = start; i < len; i += 2) {
    bytes.push(parseInt(hexString.substr(i, 2), 16));
  }

  return bytes;
}

module.exports = {
  sha1BytesSync,
  sha1HashSync,
  bytesFromArrayBuffer,
  bytesToHex,
  bytesFromHex,
};
