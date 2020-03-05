const bigInt = require('big-integer');
const config = require('../config');
const { intToUint, bigIntToBytes, bigint, bigStringInt } = require('../utils');

class TLSerializer {
  constructor(options = {}) {
    const { mtproto = false, maxLength = 2048 } = options;

    this.maxLength = maxLength;
    this.offset = 0; // in bytes
    this.schema = mtproto ? config.schema.mtproto : config.schema.api;

    this.buffer = new ArrayBuffer(this.maxLength);
    this.dataView = new DataView(this.buffer);
    this.intView = new Int32Array(this.buffer);
    this.byteView = new Uint8Array(this.buffer);
  }

  getArray() {
    const resultBuffer = new ArrayBuffer(this.offset);
    const resultArray = new Int32Array(resultBuffer);

    resultArray.set(this.intView.subarray(0, this.offset / 4));

    return resultArray;
  }

  getBuffer() {
    return this.getArray().buffer;
  }

  getBytes() {
    const bytes = [];
    for (let i = 0; i < this.offset; i++) {
      bytes.push(this.byteView[i]);
    }
    return bytes;
  }

  getTypedBytes() {
    const resultBuffer = new ArrayBuffer(this.offset);
    const resultArray = new Uint8Array(resultBuffer);

    resultArray.set(this.byteView.subarray(0, this.offset));

    return resultArray;
  }

  method(methodName, params) {
    let methodData = null;
    const { methods } = this.schema;

    for (let i = 0; i < methods.length; i++) {
      if (methods[i].method === methodName) {
        methodData = methods[i];
        break;
      }
    }

    if (!methodData) {
      throw new Error(`Method ${methodName} not found in schema`);
    }

    this.uint32(intToUint(methodData.id));

    methodData.params.forEach(paramData => {
      const param = params[paramData.name];
      // console.log(`paramData:`, paramData);
      // console.log(`param:`, param);

      this.predicate(param, paramData.type);
    });

    // console.log(`methodData:`, methodData);
  }

  predicate(predicate, type) {
    // console.log(`predicate:`, predicate);
    // console.log(`type:`, type);

    switch (type) {
      case 'int':
        return this.int(predicate);
      case 'int128':
        return this.int128(predicate);
      case 'int256':
        return this.int256(predicate);
      case 'string':
        return this.string(predicate);
      case 'long':
        return this.long(predicate);
      case 'bytes':
        return this.bytes(predicate);
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

    const { constructors } = this.schema;
    let constructorData = null;

    for (let i = 0; i < constructors.length; i++) {
      if (constructors[i].predicate === predicate._) {
        constructorData = constructors[i];
        break;
      }
    }

    if (!constructorData) {
      throw new Error(`Constructor ${predicate._} not found in schema`);
    }

    const isBare = predicate === type;

    if (!isBare) {
      this.int(intToUint(constructorData.id));
    }

    constructorData.params.forEach(paramData => {
      const param = predicate[paramData.name];
      this.predicate(param, paramData.type);
    });
  }

  int(value) {
    this.dataView.setInt32(this.offset, value, true);
    this.offset += 4;
  }

  int128(array) {
    if (array instanceof bigInt) {
      array = bigIntToBytes(array, 16);
    }
    this.byteView.set(array, this.offset);
    this.offset += 16;
  }

  int256(array) {
    if (array instanceof bigInt) {
      array = bigIntToBytes(array, 32);
    }
    this.byteView.set(array, this.offset);
    this.offset += 32;
  }

  uint32(value) {
    this.dataView.setUint32(this.offset, value, true);
    this.offset += 4;
  }

  string(value) {
    console.log(`srting[value]:`, value);
  }

  long(value) {
    if (Array.isArray(value)) {
      if (value.length === 2) {
        this.uint32(value[0]);
        this.uint32(value[1]);

        return;
      }
    }

    const { quotient, remainder } = bigInt(value).divmod(bigInt(0x100000000));

    this.int(intToUint(remainder.toJSNumber()));
    this.int(intToUint(quotient.toJSNumber()));
  }

  bytes(bytes) {
    if (bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    } else if (bytes === undefined) {
      bytes = [];
    }

    const length = bytes.byteLength || bytes.length;
    // this.checkLength(len + 8);
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
    while (this.offset % 4) {
      this.byteView[this.offset++] = 0;
    }
  }

  bytesRaw(bytes) {
    if (bytes instanceof ArrayBuffer) {
      bytes = new Uint8Array(bytes);
    }

    // this.checkLength(len);

    this.byteView.set(bytes, this.offset);
    this.offset += bytes.length;
  }
}

module.exports = TLSerializer;
