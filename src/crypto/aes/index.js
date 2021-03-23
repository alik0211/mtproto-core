const aesjs = require('aes-js');
const { xorBytes } = require('../../utils/common');

const AES = aesjs.AES;
AES.Counter = aesjs.Counter;
AES.CTR = aesjs.ModeOfOperation.ctr;

const createArray = aesjs._arrayTest.createArray;
const copyArray = aesjs._arrayTest.copyArray;

class ModeOfOperationIGE {
  constructor(key, iv) {
    this.description = 'Infinite Garble Extension';
    this.name = 'ige';

    this._aes = new AES(key);
    this._iv = iv;
    this._ivp = null;
  }

  encrypt(plaintext) {
    if (plaintext.length % 16 !== 0) {
      throw new Error('invalid plaintext size (must be multiple of 16 bytes)');
    }

    const ciphertext = createArray(plaintext.length);
    let block = createArray(16);

    if (this._ivp === null) {
      this._ivp = this._iv.slice(0, 16);
      this._iv2p = this._iv.slice(16, 32);
    }

    for (let i = 0; i < plaintext.length; i += 16) {
      const nextIv2p = plaintext.slice(i, i + 16);

      copyArray(plaintext, block, 0, i, i + 16);
      block = xorBytes(block, this._ivp);
      block = this._aes.encrypt(block);
      block = xorBytes(block, this._iv2p);
      copyArray(block, ciphertext, i);

      this._ivp = ciphertext.slice(i, i + 16);
      this._iv2p = nextIv2p;
    }

    return ciphertext;
  }

  decrypt(ciphertext) {
    if (ciphertext.length % 16 !== 0) {
      throw new Error('invalid ciphertext size (must be multiple of 16 bytes)');
    }

    const plaintext = createArray(ciphertext.length);
    let block = createArray(16);

    if (this._ivp === null) {
      this._ivp = this._iv.slice(0, 16);
      this._iv2p = this._iv.slice(16, 32);
    }

    for (let i = 0; i < ciphertext.length; i += 16) {
      const nextIvp = ciphertext.slice(i, i + 16);

      copyArray(ciphertext, block, 0, i, i + 16);
      block = xorBytes(block, this._iv2p);
      block = this._aes.decrypt(block);
      block = xorBytes(block, this._ivp);
      copyArray(block, plaintext, i);

      this._ivp = nextIvp;
      this._iv2p = plaintext.slice(i, i + 16);
    }
    return plaintext;
  }
}

AES.IGE = ModeOfOperationIGE;

module.exports = AES;
