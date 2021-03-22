const bigInt = require('big-integer');

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

function hexToBytesRaw(value, length) {
  if (!length) {
    length = Math.ceil(value.length / 2);
  }

  while (value.length < length * 2) {
    value = '0' + value;
  }

  const bytes = [];
  for (let i = 0; i < length; i++) {
    bytes.push(parseInt(value.slice(i * 2, i * 2 + 2), 16));
  }
  return bytes;
}

function hexToBytes(value, length) {
  return new Uint8Array(hexToBytesRaw(value, length));
}

function bytesToBigInt(bytes) {
  return bigInt(bytesToHex(bytes), 16);
}

function xorBytes(bytes1, bytes2) {
  let bytes = new Uint8Array(bytes1.length);
  for (let i = 0; i < bytes1.length; i++) {
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

function bytesToBytesRaw(bytes) {
  const result = [];

  for (let i = 0; i < bytes.length; i++) {
    result.push(bytes[i]);
  }

  return result;
}

function longToBytesRaw(value) {
  const result = hexToBytesRaw(bigInt(value).toString(16), 8).reverse();

  return result;
}

function intsToLong(low, high) {
  return bigInt(low).shiftLeft(32).add(bigInt(high)).toString(10);
}

function getRandomInt(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

module.exports = {
  bytesIsEqual,
  bigIntToBytes,
  hexToBytesRaw,
  hexToBytes,
  bytesToBigInt,
  xorBytes,
  concatBytes,
  bytesToHex,
  bytesToBytesRaw,
  longToBytesRaw,
  intsToLong,
  getRandomInt,
  sleep,
};
