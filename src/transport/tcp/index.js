const { Socket } = require('net');
const { Obfuscated } = require('../obfuscated');

class TCP extends Obfuscated {
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

        const payload = this.getIntermediatePayload(deobfuscatedBytes);

        this.emit('message', payload.buffer);
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

  async send(bytes) {
    const intermediateBytes = this.getIntermediateBytes(bytes);

    const obfuscatedBytes = await this.obfuscate(intermediateBytes);

    this.socket.write(obfuscatedBytes);
  }
}

module.exports = { TCP };
