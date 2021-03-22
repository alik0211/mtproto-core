const Obfuscated = require('../../src/transport/obfuscated');

const subdomainsMap = {
  1: 'pluto',
  2: 'venus',
  3: 'aurora',
  4: 'vesta',
  5: 'flora',
};

class Transport extends Obfuscated {
  constructor(dc, crypto) {
    super();

    this.dc = dc;
    this.url = `wss://${subdomainsMap[this.dc.id]}.web.telegram.org${
      this.dc.test ? '/apiws_test' : '/apiws'
    }`;
    this.crypto = crypto;

    this.connect();
  }

  get isAvailable() {
    return this.socket.readyState === WebSocket.OPEN;
  }

  connect() {
    this.socket = new WebSocket(this.url, 'binary');
    this.socket.binaryType = 'arraybuffer';

    this.socket.addEventListener('error', this.handleError.bind(this));
    this.socket.addEventListener('open', this.handleOpen.bind(this));
    this.socket.addEventListener('close', this.handleClose.bind(this));
    this.socket.addEventListener('message', this.handleMessage.bind(this));
  }

  async handleError() {
    this.emit('error', {
      type: 'socket',
    });
  }

  async handleOpen() {
    const initialMessage = await this.generateObfuscationKeys();
    this.socket.send(initialMessage);

    this.emit('open');
  }

  async handleClose() {
    if (this.isAvailable) {
      this.socket.close();
    }

    this.connect();
  }

  async handleMessage(event) {
    const obfuscatedBytes = new Uint8Array(event.data);
    const bytes = await this.deobfuscate(obfuscatedBytes);

    const payload = this.getIntermediatePayload(bytes);

    this.emit('message', payload.buffer);
  }

  async send(bytes) {
    const intermediateBytes = this.getIntermediateBytes(bytes);

    const { buffer } = await this.obfuscate(intermediateBytes);

    this.socket.send(buffer);
  }
}

module.exports = Transport;
