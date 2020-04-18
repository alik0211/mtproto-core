const EventEmitter = require('events');
const { AES } = require('../../utils/crypto');
const { getRandomBytes } = require('../../utils/common');

class Socket extends EventEmitter {
  constructor(dcId) {
    super();

    this.setUrl(dcId);

    this.socket = new WebSocket(this.url, 'binary');

    this.handleError = this.handleError.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    this.socket.addEventListener('error', this.handleError);
    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('message', this.handleMessage);
  }

  async handleError(event) {
    this.emit('error', {
      type: 'socket',
    });
  }

  async handleOpen(event) {
    const initialMessage = await this.generateObfuscationKeys();
    this.socket.send(initialMessage);

    this.emit('open', event);
  }

  async handleClose(event) {
    this.emit('close', event);
  }

  async handleMessage(event) {
    const fileReader = new FileReader();
    fileReader.onload = async event => {
      const obfuscatedBytes = new Uint8Array(event.target.result);
      const buffer = await this.deobfuscate(obfuscatedBytes);

      if (buffer.byteLength === 5) {
        const code = new DataView(buffer).getInt32(1, true) * -1;

        return this.emit('error', {
          type: 'transport',
          code,
        });
      }

      this.emit('message', buffer);
    };
    fileReader.readAsArrayBuffer(event.data);
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

    const init3buffer = await this.obfuscate(init1bytes);
    init1bytes.set(new Uint8Array(init3buffer, 56, 8), 56);

    return init1bytes;
  }

  async obfuscate(bytes) {
    return this.encryptAES.encrypt(bytes).buffer;
  }

  async deobfuscate(bytes) {
    return this.decryptAES.decrypt(bytes).buffer;
  }

  async send(bytes) {
    this.socket.send(await this.obfuscate(bytes));
  }

  destroy() {
    this.removeAllListeners();

    if (this.socket.readyState === 1) {
      this.socket.close();
    }
  }

  setUrl(dcId) {
    const subdomainsMap = {
      1: 'pluto',
      2: 'venus',
      3: 'aurora',
      4: 'vesta',
      5: 'flora',
    };

    const urlPath = this.test ? '/apiws_test' : '/apiws';

    this.url = `wss://${subdomainsMap[dcId]}.web.telegram.org${urlPath}`;
  }
}

module.exports = { Socket };
