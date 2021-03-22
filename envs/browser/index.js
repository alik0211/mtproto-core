const makeMTProto = require('../../src');
const SHA1 = require('./sha1');
const SHA256 = require('./sha256');
const PBKDF2 = require('./pbkdf2');
const Crypto = require('../../src/utils/crypto');
const Storage = require('../../src/storage');
const Transport = require('./transport');
const getRandomBytes = require('./get-random-bytes');
const getLocalStorage = require('./get-local-storage');

function createTransport(dc, crypto) {
  return new Transport(dc, crypto);
}

function createStorage(storageOptions) {
  return new Storage(storageOptions, getLocalStorage);
}

function createCrypto() {
  return new Crypto({ SHA1, SHA256, PBKDF2, getRandomBytes });
}

const MTProto = makeMTProto({
  createCrypto,
  createStorage,
  createTransport,
});

module.exports = MTProto;
