const makeMTProto = require('../../src');
const SHA1 = require('../../src/utils/crypto/sha1');
const SHA256 = require('../../src/utils/crypto/sha256');
const PBKDF2 = require('../../src/utils/crypto/pbkdf2');
const Crypto = require('../../src/utils/crypto');
const Storage = require('../../src/storage');
const Transport = require('../../src/transport/tcp');
const getRandomBytes = require('../../src/utils/common/random');
const getLocalStorage = require('../../src/storage/local');

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
