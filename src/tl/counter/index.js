const builderMap = require('../builder');

class Counter {
  constructor(fn, params) {
    this.count = 0;

    fn.call(this, params);
  }

  uint32() {
    this.count += 4;
  }

  int32() {
    this.count += 4;
  }

  long() {
    this.count += 8;
  }

  int128() {
    this.count += 16;
  }

  int256() {
    this.count += 32;
  }

  double() {
    this.count += 8;
  }

  bytes(bytes) {
    const { length } = bytes;

    if (length <= 253) {
      this.count += 1;
    } else {
      this.count += 4;
    }

    this.count += length;

    // Padding
    while (this.count % 4 !== 0) {
      this.count += 1;
    }
  }

  bytesRaw(bytes) {
    this.count += bytes.length;
  }

  string(value) {
    const encoder = new TextEncoder();

    const bytes = encoder.encode(value);

    this.bytes(bytes);
  }

  int() {
    this.int32();
  }

  // TODO: Convert method name to 'bool'
  Bool(value) {
    this.count += 4;
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
    this.count += 8;

    for (let i = 0; i < value.length; i++) {
      fn.call(this, value[i]);
    }
  }

  predicate(params, bare = false) {
    const fn = builderMap[params._];

    fn.call(this, params);
  }
}

module.exports = Counter;
