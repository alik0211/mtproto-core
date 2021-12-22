const pako = require('pako');
const parserMap = require('../parser');
const { intsToLong } = require('../../utils/common');

class Deserializer {
  constructor(buffer) {
    this.buffer = buffer;
    this.byteView = new Uint8Array(this.buffer);
    this.dataView = new DataView(
      this.buffer,
      this.byteView.byteOffset,
      this.byteView.byteLength
    );

    this.offset = 0;
  }

  uint32() {
    const value = this.dataView.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }

  int32() {
    const value = this.dataView.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  long() {
    const high = this.uint32();
    const low = this.uint32();

    const result = intsToLong(low, high);

    return result;
  }

  int128() {
    return this.byteView.slice(this.offset, (this.offset += 16));
  }

  int256() {
    return this.byteView.slice(this.offset, (this.offset += 32));
  }

  double() {
    const value = this.dataView.getFloat64(this.offset, true);
    this.offset += 8;
    return value;
  }

  string() {
    const decoder = new TextDecoder();

    return decoder.decode(this.bytes());
  }

  bytes() {
    let length = this.byteView[this.offset++];
    if (length === 254) {
      length =
        this.byteView[this.offset++] |
        (this.byteView[this.offset++] << 8) |
        (this.byteView[this.offset++] << 16);
    }
    const bytes = this.byteView.slice(this.offset, (this.offset += length));

    while (this.offset % 4 !== 0) {
      this.offset++;
    }

    return bytes;
  }

  int() {
    return this.int32();
  }

  vector(fn, bare = false) {
    if (!bare) {
      this.int32();
    }

    const length = this.int32();
    const result = [];

    for (let i = 0; i < length; i++) {
      result.push(fn.call(this));
    }

    return result;
  }

  gzip() {
    const gzippedBytes = this.bytes();

    const deserializer = new Deserializer(pako.inflate(gzippedBytes).buffer);

    const result = deserializer.predicate();

    return result;
  }

  mt_message() {
    const fn = parserMap.get(1538843921);

    return fn.call(this);
  }

  predicate() {
    const id = this.int32() >>> 0;
    const fn = parserMap.get(id);

    if (!fn) {
      console.log('Not found predicate with id:', id);

      return;
    }

    return fn.call(this);
  }
}

module.exports = Deserializer;
