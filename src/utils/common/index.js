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

function hexToBytes(str, length) {
  if (!length) {
    length = Math.ceil(str.length / 2);
  }
  while (str.length < length * 2) {
    str = '0' + str;
  }
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = parseInt(str.slice(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function bytesToBigInt(bytes) {
  const digits = new Array(bytes.byteLength);
  for (let i = 0; i < bytes.byteLength; i++) {
    digits[i] =
      bytes[i] < 16 ? '0' + bytes[i].toString(16) : bytes[i].toString(16);
  }
  return bigInt(digits.join(''), 16);
}

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

function bytesFromWords(wordArray) {
  var words = wordArray.words;
  var sigBytes = wordArray.sigBytes;
  var bytes = [];

  for (var i = 0; i < sigBytes; i++) {
    bytes.push((words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
  }

  return bytes;
}

function bytesToBytesRaw(bytes) {
  const result = [];

  for (let i = 0; i < bytes.length; i++) {
    result.push(bytes[i]);
  }

  return result;
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
  bytesFromWords,
  bytesToBytesRaw,
  longToInts,
  longToBytes,
  longFromInts,
  intToUint,
  uintToInt,
  getRandomInt,
};
