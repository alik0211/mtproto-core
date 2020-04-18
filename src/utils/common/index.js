const bigInt = require('big-integer');
const { getRandomBytes } = require('./random');

function bytesIsEqual(bytes1, bytes2) {
  if (bytes1.length !== bytes2.length) {
    return false;
  }

  for (let i = 0; i < bytes1.length; i++) {
    if (bytes1[i] !== bytes2[i]) {
      return false;
    }
  }

  return true;
}

function bigIntToBytes(bigInt, length) {
  return hexToBytes(bigInt.toString(16), length);
}

function hexToBytes(str, len) {
  if (!len) {
    len = Math.ceil(str.length / 2);
  }
  while (str.length < len * 2) {
    str = '0' + str;
  }
  const buf = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buf[i] = parseInt(str.slice(i * 2, i * 2 + 2), 16);
  }
  return buf;
}

function bytesToBigInt(bytes) {
  const digits = new Array(bytes.byteLength);
  for (let i = 0; i < bytes.byteLength; i++) {
    digits[i] =
      bytes[i] < 16 ? '0' + bytes[i].toString(16) : bytes[i].toString(16);
  }
  return bigInt(digits.join(''), 16);
}

// function getRandomBytes(length) {
//   const bytes = new Uint8Array(length);
//   crypto.getRandomValues(bytes);
//   return bytes;
// }

function xorBytes(bytes1, bytes2) {
  let bytes = new Uint8Array(bytes1.byteLength);
  for (let i = 0; i < bytes1.byteLength; i++) {
    bytes[i] = bytes1[i] ^ bytes2[i];
  }
  return bytes;
}

function concatBytes(...arrays) {
  let length = 0;

  for (let bytes of arrays) {
    length += bytes.length;
  }

  let result = new Uint8Array(length);
  let offset = 0;

  for (let bytes of arrays) {
    result.set(bytes, offset);
    offset += bytes.length;
  }

  return result;
}

function bytesToHex(bytes) {
  const result = [];
  for (let i = 0; i < bytes.length; i++) {
    result.push((bytes[i] < 16 ? '0' : '') + bytes[i].toString(16));
  }
  return result.join('');
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

function bytesXor(bytes1, bytes2) {
  var len = bytes1.length;
  var bytes = [];

  for (var i = 0; i < len; ++i) {
    bytes[i] = bytes1[i] ^ bytes2[i];
  }

  return bytes;
}

function bytesFromWords(wordArray) {
  var words = wordArray.words;
  var sigBytes = wordArray.sigBytes;
  var bytes = [];

  for (var i = 0; i < sigBytes; i++) {
    bytes.push((words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
  }

  return bytes;
}

function bytesFromBigInt(bigInt, len) {
  var bytes = bigInt.toByteArray();

  if (len && bytes.length < len) {
    var padding = [];
    for (var i = 0, needPadding = len - bytes.length; i < needPadding; i++) {
      padding[i] = 0;
    }
    if (bytes instanceof ArrayBuffer) {
      bytes = bufferConcat(padding, bytes);
    } else {
      bytes = padding.concat(bytes);
    }
  } else {
    while (!bytes[0] && (!len || bytes.length > len)) {
      bytes = bytes.slice(1);
    }
  }

  return bytes;
}

function convertToUint8Array(bytes) {
  if (bytes.buffer !== undefined) {
    return bytes;
  }
  return new Uint8Array(bytes);
}

function convertToByteArray(bytes) {
  if (Array.isArray(bytes)) {
    return bytes;
  }
  bytes = convertToUint8Array(bytes);
  var newBytes = [];
  for (var i = 0, len = bytes.length; i < len; i++) {
    newBytes.push(bytes[i]);
  }
  return newBytes;
}

function bufferConcat(buffer1, buffer2) {
  var l1 = buffer1.byteLength || buffer1.length;
  var l2 = buffer2.byteLength || buffer2.length;
  var tmp = new Uint8Array(l1 + l2);
  tmp.set(
    buffer1 instanceof ArrayBuffer ? new Uint8Array(buffer1) : buffer1,
    0
  );
  tmp.set(
    buffer2 instanceof ArrayBuffer ? new Uint8Array(buffer2) : buffer2,
    l1
  );

  return tmp.buffer;
}

function longToInts(sLong) {
  const { quotient, remainder } = bigInt(sLong).divmod(bigInt(0x100000000));

  return [uintToInt(quotient.toJSNumber()), uintToInt(remainder.toJSNumber())];
}

function longToBytes(sLong) {
  return bytesFromWords({ words: longToInts(sLong), sigBytes: 8 }).reverse();
}

function longFromInts(high, low) {
  return bigInt(high).shiftLeft(32).add(bigInt(low)).toString(10);
}

function intToUint(value) {
  value = +value;

  return value < 0 ? value + 4294967296 : value;
}

function uintToInt(val) {
  if (val > 2147483647) {
    val = val - 4294967296;
  }
  return val;
}

function getRandomInt(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

module.exports = {
  bytesIsEqual,
  bigIntToBytes,
  hexToBytes,
  bytesToBigInt,
  getRandomBytes,
  xorBytes,
  concatBytes,
  bytesToHex,
  bytesFromHex,
  bytesXor,
  bytesFromWords,
  bytesFromBigInt,
  convertToUint8Array,
  convertToByteArray,
  bufferConcat,
  longToInts,
  longToBytes,
  longFromInts,
  intToUint,
  uintToInt,
  getRandomInt,
};
