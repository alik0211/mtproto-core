const { polyfillGlobal } = require("react-native/Libraries/Utilities/PolyfillFunctions");
const { TextEncoder, TextDecoder } = require("text-encoding");
const makeMTProto = require('../../src');
const SHA1 = require('./sha1');
const SHA256 = require('./sha256');
const PBKDF2 = require('./pbkdf2');
const Transport = require('./transport');
const getRandomBytes = require('./get-random-bytes');
const getLocalStorage = require('./get-local-storage');

polyfillGlobal("TextEncoder", () => TextEncoder);
polyfillGlobal("TextDecoder", () => TextDecoder);

function createTransport(dc, crypto) {
  return new Transport(dc, crypto);
}

const MTProto = makeMTProto({
  SHA1,
  SHA256,
  PBKDF2,
  getRandomBytes,
  getLocalStorage,
  createTransport,
});

module.exports = MTProto;
