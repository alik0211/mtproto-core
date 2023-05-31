const net = require('net');
const Obfuscated = require('../../src/transport/obfuscated');
const baseDebug = require('../../src/utils/common/base-debug');

class Transport extends Obfuscated {
  constructor(dc, crypto) {
    super();

    this.dc = dc;
    this.debug = baseDebug.extend(`transport-${this.dc.id}`);
    this.crypto = crypto;
    this.destroyed = false;
    this.handleConnect = this.handleConnect.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleError = this.handleError.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.connect();
  }

  destroy() {
    this.destroyed = true;
    this.debug('destroy');

    if (this.socket && !this.socket.destroyed) {
      this.socket.destroy();
    }
  }

  get isAvailable() {
    return this.socket.writable;
  }

  connect() {
    this.stream = new Uint8Array();

    this.socket = net.connect(
      this.dc.port,
      this.dc.ip,
      this.handleConnect
    );

    this.socket.on('data', this.handleData);
    this.socket.on('error', this.handleError);
    this.socket.on('close', this.handleClose);

    this.debug('connect');
  }

  async handleData(data) {
    const bytes = new Uint8Array(data);

    const deobfuscatedBytes = await this.deobfuscate(bytes);

    this.stream = new Uint8Array([...this.stream, ...deobfuscatedBytes]);

    // The minimum length is eight (transport error with a intermediate header)
    while (this.stream.length >= 8) {
      const dataView = new DataView(this.stream.buffer);
      const payloadLength = dataView.getUint32(0, true);

      if (payloadLength <= this.stream.length - 4) {
        const payload = this.stream.slice(4, payloadLength + 4);

        if (payloadLength === 4) {
          const code = dataView.getInt32(4, true) * -1;

          this.emit('error', {
            type: 'transport',
            code,
          });
        } else {
          this.emit('message', payload.buffer);
        }

        this.stream = this.stream.slice(payloadLength + 4);
      } else {
        break;
      }
    }
  }

  async handleError(error) {
    this.emit('error', {
      type: 'socket',
    });
  }

  async handleClose(hadError) {
    if (!this.socket.destroyed) {
      this.socket.destroy();
    }

    this.socket.off('data', this.handleData);
    this.socket.off('error', this.handleError);
    this.socket.off('close', this.handleClose);
    
    if (!this.destroyed) {
      this.connect();
    }
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
}

module.exports = Transport;
