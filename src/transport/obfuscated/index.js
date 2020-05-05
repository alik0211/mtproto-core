const EventEmitter = require('events');
const { AES } = require('../../utils/crypto');
const { getRandomBytes } = require('../../utils/common');

class Obfuscated extends EventEmitter {
  async generateObfuscationKeys() {
    const init1bytes = getRandomBytes(64);

    // 0xeeeeeeee -> [238, 238, 238, 238]
    init1bytes.set([238, 238, 238, 238], 56);

    const init2bytes = new Uint8Array(init1bytes).reverse();

    const encryptKey = init1bytes.slice(8, 40);
    const encryptIV = init1bytes.slice(40, 56);

    const decryptKey = init2bytes.slice(8, 40);
    const decryptIV = init2bytes.slice(40, 56);

    this.encryptAES = new AES.CTR(encryptKey, encryptIV);
    this.decryptAES = new AES.CTR(decryptKey, decryptIV);

    const init3bytes = await this.obfuscate(init1bytes);
    init1bytes.set(init3bytes.slice(56, 64), 56);

    return init1bytes;
  }

  async obfuscate(bytes) {
    return this.encryptAES.encrypt(bytes);
  }

  async deobfuscate(bytes) {
    return this.decryptAES.decrypt(bytes);
  }

  getIntermediatePayload(bytes) {
    const dataView = new DataView(bytes.buffer);

    const payloadLength = dataView.getUint32(0, true);

    if (payloadLength === 4) {
      const code = dataView.getInt32(4, true) * -1;

      this.emit('error', {
        type: 'transport',
        code,
      });
    }

    return bytes.slice(4);
  }

  getIntermediateBytes(bytes) {
    const resultBytes = new Uint8Array(bytes.length + 4);

    const dataView = new DataView(resultBytes.buffer);
    dataView.setUint32(0, bytes.length, true);

    resultBytes.set(bytes, 4);

    return resultBytes;
  }
}

module.exports = {
  Obfuscated,
};
