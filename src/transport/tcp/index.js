const { Socket } = require('net');
const { Obfuscated } = require('../obfuscated');

class TCP extends Obfuscated {
  constructor(dc) {
    super();

    this.dc = dc;

    this.handleConnect = this.handleConnect.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.connect();
  }

  connect() {
    this.socket = new Socket();

    this.socket.on('data', this.handleData);
    this.socket.on('error', this.handleError);
    this.socket.on('close', this.handleClose);

    this.socket.connect(this.dc.port, this.dc.ip, this.handleConnect);
  }

  async handleData(data) {
    const bytes = new Uint8Array(data);

    const deobfuscatedBytes = await this.deobfuscate(bytes);

    const payload = this.getIntermediatePayload(deobfuscatedBytes);

    this.emit('message', payload.buffer);
  }

  async handleError(error) {
    this.emit('error', {
      type: 'socket',
    });
  }

  async handleClose() {
    this.emit('close');
  }

  async handleConnect() {
    const initialMessage = await this.generateObfuscationKeys();
    this.socket.write(initialMessage);

    this.emit('open');
  }

  async send(bytes) {
    const intermediateBytes = this.getIntermediateBytes(bytes);

    const obfuscatedBytes = await this.obfuscate(intermediateBytes);

    this.socket.write(obfuscatedBytes);
  }

  destroy() {
    this.removeAllListeners();

    if (!this.socket.destroyed) {
      this.socket.destroy();
    }
  }
}

module.exports = { TCP };
