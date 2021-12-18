const makeMTProto = require("../../src");
const SHA1 = require("../browser/sha1");
const SHA256 = require("../browser/sha256");
const PBKDF2 = require("../browser/pbkdf2");
const Transport = require("./transport");
const getRandomBytes = require("../browser/get-random-bytes");
const getLocalStorage = require("../browser/get-local-storage");

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
