const bigInt = require('big-integer');
const schema = require('../../scheme/full.json');
const { intToUint, bigIntToBytes } = require('../utils/common');

class TLSerializer {
  constructor(options = {}) {
    const { maxLength = 2048 } = options;

    this.maxLength = maxLength;
    this.offset = 0; // in bytes
    this.padTo = 0;

    this.createBuffer();
  }

  createBuffer() {
    this.buffer = new ArrayBuffer(this.maxLength);
    this.dataView = new DataView(this.buffer);
    this.byteView = new Uint8Array(this.buffer);
  }

  setAbridgedHeader(length) {
    const wordCount = length / 4;

    if (wordCount < 0x7f) {
      this.byteView[0] = wordCount;
      this.offset = 1;
      this.padTo = 1;
    } else {
      this.byteView[0] = 0x7f;
      this.byteView[1] = wordCount & 0xff;
      this.byteView[2] = (wordCount >> 8) & 0xff;
      this.byteView[3] = (wordCount >> 16) & 0xff;
      this.offset = 4;
    }
  }

  getBuffer() {
    return this.getBytes().buffer;
  }

  getBytesRaw() {
    const bytes = [];
    for (let i = 0; i < this.offset; i++) {
      bytes.push(this.byteView[i]);
    }
    return bytes;
  }

  getBytes() {
    const resultBuffer = new ArrayBuffer(this.offset);
    const resultArray = new Uint8Array(resultBuffer);

    resultArray.set(this.byteView.subarray(0, this.offset));

    return resultArray;
  }

  checkLength(needBytes) {
    if (this.offset + needBytes < this.maxLength) {
      return;
    }

    this.maxLength =
      Math.ceil(
        Math.max(this.maxLength * 2, this.offset + needBytes + 16) / 4
      ) * 4;
    const previousBuffer = this.buffer;
    const previousArray = new Int32Array(previousBuffer);

    this.createBuffer();

    new Int32Array(this.buffer).set(previousArray);
  }

  method(methodName, params) {
    const methodData = schema.methodsByName[methodName];

    if (!methodData) {
      throw new Error(`Method ${methodName} not found in schema`);
    }

    this.uint32(methodData.id);

    methodData.params.forEach(paramData => {
      const param = params[paramData.name];
      let paramType = paramData.type;

      if (paramType.indexOf('?') !== -1) {
        const condType = paramType.split('?');
        const fieldBit = condType[0].split('.');
        if (!(params[fieldBit[0]] & (1 << fieldBit[1]))) {
          return;
        }
        paramType = condType[1];
      }

      this.predicate(param, paramType);
    });
  }

  predicate(predicate, type) {
    // console.log(`predicate:`, predicate);
    // console.log(`type:`, type);

    switch (type) {
      case '#':
      case 'int':
        return this.int(predicate);
      case 'int128':
        return this.int128(predicate);
      case 'int256':
        return this.int256(predicate);
      case 'int512':
        return this.int512(predicate);
      case 'string':
        return this.string(predicate);
      case 'long':
        return this.long(predicate);
      case 'double':
        return this.double(predicate);
      case 'Bool':
        return this.bool(predicate);
      case 'bytes':
        return this.bytes(predicate);
      case 'true':
      case '!X':
        return;
    }

    if (
      Array.isArray(predicate) &&
      type.substr(0, 6).toLowerCase() == 'vector'
    ) {
      this.int(0x1cb5c415); // Store vector id
      this.int(predicate.length); // Store vector length

      const vectorType = type.substr(7, type.length - 8);

      predicate.forEach(vectorValue => {
        this.predicate(vectorValue, vectorType);
      });

      return;
    }

    const constructorId = schema.constructorsIdsByPredicate[predicate._];
    const constructorData = schema.constructorsById[constructorId];

    if (!constructorData) {
      throw new Error(`Constructor ${predicate._} not found in schema`);
    }

    let isBare = type.charAt(0) === '%';

    if (isBare) {
      type = type.substr(1);
    }

    if (predicate === type) {
      isBare = true;
    }

    if (!isBare) {
      this.int(constructorData.id);
    }

    constructorData.params.forEach(paramData => {
      const param = predicate[paramData.name];
      let paramType = paramData.type;

      if (paramType.indexOf('?') !== -1) {
        const condType = paramType.split('?');
        const fieldBit = condType[0].split('.');
        if (!(predicate[fieldBit[0]] & (1 << fieldBit[1]))) {
          return;
        }
        paramType = condType[1];
      }

      this.predicate(param, paramType);
    });
  }

  int(value) {
    this.checkLength(4);
    this.dataView.setInt32(this.offset, value, true);
    this.offset += 4;
  }

  int128(array) {
    if (array instanceof bigInt) {
      array = bigIntToBytes(array, 16);
    }
    this.checkLength(16);
    this.byteView.set(array, this.offset);
    this.offset += 16;
  }

  int256(array) {
    if (array instanceof bigInt) {
      array = bigIntToBytes(array, 32);
    }
    this.checkLength(32);
    this.byteView.set(array, this.offset);
    this.offset += 32;
  }

  int512(array) {
    if (array instanceof bigInt) {
      array = bigIntToBytes(array, 64);
    }
    this.checkLength(64);
    this.byteView.set(array, this.offset);
    this.offset += 64;
  }

  uint32(value) {
    this.checkLength(4);
    this.dataView.setUint32(this.offset, value, true);
    this.offset += 4;
  }

  string(value) {
    const encoder = new TextEncoder();

    const bytes = encoder.encode(value);

    this.bytes(bytes);
  }

  long(value) {
    if (Array.isArray(value)) {
      if (value.length === 2) {
        this.uint32(value[1]);
        this.uint32(value[0]);

        return;
      }
    }

    const { quotient, remainder } = bigInt(value).divmod(bigInt(0x100000000));

    this.int(intToUint(remainder.toJSNumber()));
    this.int(intToUint(quotient.toJSNumber()));
  }

  double(value) {
    this.checkLength(8);
    this.dataView.setFloat64(this.offset, value, true);
    this.offset += 8;
  }

  bool(value) {
    if (value) {
      this.int(0x997275b5);
    } else {
      this.int(0xbc799737);
    }
  }

  bytes(bytes) {
    if (bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    } else if (bytes === undefined) {
      bytes = [];
    }

    const length = bytes.byteLength || bytes.length;

    this.checkLength(length + 8);

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
    while (this.offset % 4 !== this.padTo) {
      this.byteView[this.offset++] = 0;
    }
  }

  bytesRaw(bytes) {
    if (bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    }

    this.checkLength(bytes.length);

    this.byteView.set(bytes, this.offset);
    this.offset += bytes.length;
  }
}

module.exports = TLSerializer;
