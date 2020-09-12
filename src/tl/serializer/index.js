const bigInt = require('big-integer');

class Serializer {
  constructor() {
    // 0.5 MB
    this.buffer = new ArrayBuffer(524288);
    this.dataView = new DataView(this.buffer);
    this.byteView = new Uint8Array(this.buffer);

    this.offset = 0;
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

  getBytes() {
    const resultBuffer = new ArrayBuffer(this.offset);
    const resultArray = new Uint8Array(resultBuffer);

    resultArray.set(this.byteView.subarray(0, this.offset));

    return resultArray;
  }

  getBuffer() {
    return this.getBytes().buffer;
  }
}

module.exports = Serializer;
