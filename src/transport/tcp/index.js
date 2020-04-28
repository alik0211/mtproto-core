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

    this.stream = new Uint8Array();

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

    this.stream = new Uint8Array([...this.stream, ...deobfuscatedBytes]);

    const dataView = new DataView(this.stream.buffer);
    const payloadLength = dataView.getUint32(0, true);

    if (payloadLength === this.stream.length - 4) {
      const payload = this.stream.slice(4);

      if (payloadLength === 4) {
        const code = dataView.getInt32(4, true) * -1;

        this.emit('error', {
          type: 'transport',
          code,
        });
      } else {
        this.emit('message', payload.buffer);
      }

      this.stream = new Uint8Array();
    }
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
