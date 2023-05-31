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
    this.destroyed = false;
    this.handleError = this.handleError.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleMessage = this.handleMessage.bind(this);

    this.connect();
  }

  destroy() {
    this.destroyed = true;
    this.ws.close();
  }

  get isAvailable() {
    return this.socket.readyState === WebSocket.OPEN;
  }

  connect() {
    this.socket = new WebSocket(this.url, 'binary');
    this.socket.binaryType = 'arraybuffer';

    this.socket.addEventListener('error', this.handleError);
    this.socket.addEventListener('open', this.handleOpen);
    this.socket.addEventListener('close', this.handleClose);
    this.socket.addEventListener('message', this.handleMessage);
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

    this.socket.removeEventListener('error', this.handleError);
    this.socket.removeEventListener('open', this.handleOpen);
    this.socket.removeEventListener('close', this.handleClose);
    this.socket.removeEventListener('message', this.handleMessage);

    if (!this.destroyed) {
      this.connect();
    }
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
