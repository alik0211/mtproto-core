const bigInt = require('big-integer');
const Counter = require('../counter');
const builderMap = require('../builder');

class Serializer {
  constructor(fn, params) {
    const counter = new Counter(fn, params);

    this.buffer = new ArrayBuffer(counter.count);
    this.dataView = new DataView(this.buffer);
    this.byteView = new Uint8Array(this.buffer);

    this.offset = 0;

    fn.call(this, params);
  }

  uint32(value) {
    this.dataView.setUint32(this.offset, value, true);
    this.offset += 4;
  }

  int32(value) {
    this.dataView.setInt32(this.offset, value, true);
    this.offset += 4;
  }

  long(value) {
    if (Array.isArray(value)) {
      if (value.length === 2) {
        const [low, high] = value;

        this.uint32(high);
        this.uint32(low);
      } else {
        this.bytesRaw(value);
      }

      return;
    }

    const { quotient, remainder } = bigInt(value).divmod(bigInt(0x100000000));

    this.uint32(remainder.toJSNumber());
    this.uint32(quotient.toJSNumber());
  }

  int128(array) {
    this.byteView.set(array, this.offset);
    this.offset += 16;
  }

  int256(array) {
    this.byteView.set(array, this.offset);
    this.offset += 32;
  }

  double(value) {
    this.dataView.setFloat64(this.offset, value, true);
    this.offset += 8;
  }

  bytes(bytes) {
    const { length } = bytes;

    if (length <= 253) {
      this.byteView[this.offset++] = length;
    } else {
      this.byteView[this.offset++] = 254;
      this.byteView[this.offset++] = length & 0xff;
      this.byteView[this.offset++] = (length & 0xff00) >> 8;
      this.byteView[this.offset++] = (length & 0xff0000) >> 16;
    }

    this.byteView.set(bytes, this.offset);
    this.offset += length;

    // Padding
    while (this.offset % 4 !== 0) {
      this.byteView[this.offset++] = 0;
    }
  }

  bytesRaw(bytes) {
    this.byteView.set(bytes, this.offset);
    this.offset += bytes.length;
  }

  string(value) {
    const encoder = new TextEncoder();

    const bytes = encoder.encode(value);

    this.bytes(bytes);
  }

  int(value) {
    this.int32(value);
  }

  // TODO: Convert method name to 'bool'
  Bool(value) {
    this.predicate({ _: value ? 'boolTrue' : 'boolFalse' });
  }

  has(value) {
    return +!!(Array.isArray(value) ? value.length : value);
  }

  flag(fn, value) {
    if (this.has(value)) {
      fn.call(this, value);
    }
  }

  flagVector(fn, value) {
    if (value === undefined || value.length === 0) {
      return;
    }

    this.vector(fn, value);
  }

  vector(fn, value) {
    this.int32(0x1cb5c415);
    this.int32(value.length);

    for (let i = 0; i < value.length; i++) {
      fn.call(this, value[i]);
    }
  }

  predicate(params, bare = false) {
    const fn = builderMap[params._];

    fn.call(this, params);
  }

  getBytes() {
    return this.byteView;
  }

  getBuffer() {
    return this.buffer;
  }
}

module.exports = Serializer;
