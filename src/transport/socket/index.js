const { Obfuscated } = require('../obfuscated');

class Socket extends Obfuscated {
  constructor(dc) {
    super();

    this.dc = dc;

    this.setUrl();

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
      const bytes = await this.deobfuscate(obfuscatedBytes);

      const payload = this.getIntermediatePayload(bytes);

      this.emit('message', payload.buffer);
    };
    fileReader.readAsArrayBuffer(event.data);
  }

  async send(bytes) {
    const intermediateBytes = this.getIntermediateBytes(bytes);

    const buffer = (await this.obfuscate(intermediateBytes)).buffer;

    this.socket.send(buffer);
  }

  destroy() {
    this.removeAllListeners();

    if (this.socket.readyState === 1) {
      this.socket.close();
    }
  }

  setUrl() {
    const subdomainsMap = {
      1: 'pluto',
      2: 'venus',
      3: 'aurora',
      4: 'vesta',
      5: 'flora',
    };

    const dcId = this.dc.id;
    const urlPath = this.dc.test ? '/apiws_test' : '/apiws';

    this.url = `wss://${subdomainsMap[dcId]}.web.telegram.org${urlPath}`;
  }
}

module.exports = { Socket };
