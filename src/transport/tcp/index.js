const Socket = require('net').Socket;
const EventEmitter = require('events');
const { AES } = require('../../utils/crypto');
const { getRandomBytes } = require('../../utils/common');

class TCP extends EventEmitter {
  constructor(dc) {
    super();

    this.dc = dc;

    this.connect();
  }

  connect() {
    this.socket = new Socket();

    this.socket.connect(this.dc.port, this.dc.ip, async () => {
      this.socket.on('data', async data => {
        const bytes = new Uint8Array(data);

        const deobfuscatedBytes = await this.deobfuscate(bytes);

        this.emit('message', deobfuscatedBytes.buffer);
      });

      this.socket.on('error', error => {
        console.log(`error:`, error);
      });

      this.socket.on('close', () => {
        console.log(`close`);
      });

      const initialMessage = await this.generateObfuscationKeys();
      this.socket.write(initialMessage);

      this.emit('open');
    });
  }

  async generateObfuscationKeys() {
    const protocolId = 0xefefefef;
    const init1bytes = getRandomBytes(64);
    const init1buffer = init1bytes.buffer;
    const init1data = new DataView(init1buffer);
    init1data.setUint32(56, protocolId, true);

    const init2buffer = new ArrayBuffer(init1buffer.byteLength);
    const init2bytes = new Uint8Array(init2buffer);
    for (let i = 0; i < init2buffer.byteLength; i++) {
      init2bytes[init2buffer.byteLength - i - 1] = init1bytes[i];
    }

    let encryptKey = new Uint8Array(init1buffer, 8, 32);
    const encryptIV = new Uint8Array(16);
    encryptIV.set(new Uint8Array(init1buffer, 40, 16));

    let decryptKey = new Uint8Array(init2buffer, 8, 32);
    const decryptIV = new Uint8Array(16);
    decryptIV.set(new Uint8Array(init2buffer, 40, 16));

    this.encryptAES = new AES.CTR(encryptKey, encryptIV);
    this.decryptAES = new AES.CTR(decryptKey, decryptIV);

    const init3buffer = (await this.obfuscate(init1bytes)).buffer;
    init1bytes.set(new Uint8Array(init3buffer, 56, 8), 56);

    return init1bytes;
  }

  async obfuscate(bytes) {
    return this.encryptAES.encrypt(bytes);
  }

  async deobfuscate(bytes) {
    return this.decryptAES.decrypt(bytes);
  }

  async send(bytes) {
    const obfuscatedBytes = await this.obfuscate(bytes);

    this.socket.write(obfuscatedBytes);
  }
}

module.exports = { TCP };
