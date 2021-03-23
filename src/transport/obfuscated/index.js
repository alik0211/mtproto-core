const EventEmitter = require('events');
const AES = require('../../crypto/aes');

class Obfuscated extends EventEmitter {
  // https://core.telegram.org/mtproto/mtproto-transports#transport-obfuscation
  async generateObfuscationKeys() {
    let initBytes = null;

    while (true) {
      initBytes = this.crypto.getRandomBytes(64);
      const initDataView = new DataView(initBytes.buffer);
      initDataView.setUint32(56, 0xeeeeeeee, true);

      if (initBytes[0] === 0xef) {
        continue;
      }

      const firstInt = initDataView.getUint32(0, true);

      if (
        [
          0x44414548,
          0x54534f50,
          0x20544547,
          0x4954504f,
          0xdddddddd,
          0xeeeeeeee,
          0x02010316,
        ].includes(firstInt)
      ) {
        continue;
      }

      const secondInt = initDataView.getUint32(4, true);

      if (secondInt === 0) {
        continue;
      }

      break;
    }

    const initRevBytes = new Uint8Array(initBytes).reverse();

    const encryptKey = initBytes.slice(8, 40);
    const encryptIV = initBytes.slice(40, 56);

    const decryptKey = initRevBytes.slice(8, 40);
    const decryptIV = initRevBytes.slice(40, 56);

    this.encryptAES = new AES.CTR(encryptKey, encryptIV);
    this.decryptAES = new AES.CTR(decryptKey, decryptIV);

    const encryptedInitBytes = await this.obfuscate(initBytes);
    initBytes.set(encryptedInitBytes.slice(56, 64), 56);

    return initBytes;
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

module.exports = Obfuscated;
