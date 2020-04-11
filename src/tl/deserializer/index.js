const pako = require('pako');
const bigInt = require('big-integer');
const { schema } = require('../../../scheme');
const { uintToInt } = require('../../utils/common');

class TLDeserializer {
  constructor(buffer) {
    this.buffer = buffer;
    this.byteView = new Uint8Array(this.buffer);
    this.dataView = new DataView(
      this.buffer,
      this.byteView.byteOffset,
      this.byteView.byteLength
    );

    this.offset = 0;
    this.paddingTo = 0;
  }

  readAbridgedHeader() {
    if (this.byteView[0] >= 1 && this.byteView[0] <= 0x7e) {
      this.offset = 1;
      this.paddingTo = 1;
    } else if (this.byteView[0] === 0x7f) {
      this.offset = 4;
      this.paddingTo = 0;
    } else {
      throw new Error(`Invalid first byte: ${this.byteView[0]}`);
    }
  }

  int() {
    const value = this.dataView.getInt32(this.offset, true);
    this.offset += 4;
    return value;
  }

  uint32() {
    const value = this.dataView.getUint32(this.offset, true);
    this.offset += 4;
    return value;
  }

  long() {
    const iLow = this.uint32();
    const iHigh = this.uint32();

    const result = bigInt(iHigh).shiftLeft(32).add(bigInt(iLow)).toString();

    return result;
  }

  int128() {
    return this.byteView.slice(this.offset, (this.offset += 16));
  }

  int256() {
    return this.byteView.slice(this.offset, (this.offset += 32));
  }

  int512() {
    return this.byteView.slice(this.offset, (this.offset += 64));
  }

  double() {
    const value = this.data.getFloat64(this.offset, true);
    this.offset += 8;
    return value;
  }

  bool() {
    const id = this.int();
    if (id == 0x997275b5) {
      return true;
    }

    if (id == 0xbc799737) {
      return false;
    }

    this.offset -= 4;
    return this.predicate();
  }

  string() {
    const decoder = new TextDecoder();

    return decoder.decode(this.bytes());
  }

  bytes() {
    let length = this.byteView[this.offset++];
    if (length == 254) {
      length =
        this.byteView[this.offset++] |
        (this.byteView[this.offset++] << 8) |
        (this.byteView[this.offset++] << 16);
    }
    const bytes = this.byteView.slice(this.offset, (this.offset += length));

    while (this.offset % 4 !== this.paddingTo) {
      this.offset++;
    }

    return bytes;
  }

  predicate(type = 'Object') {
    switch (type) {
      case '#':
      case 'int':
        return this.int();
      case 'long':
        return this.long();
      case 'int128':
        return this.int128();
      case 'int256':
        return this.int256();
      case 'int512':
        return this.int512();
      case 'string':
        return this.string();
      case 'bytes':
        return this.bytes();
      case 'double':
        return this.double();
      case 'Bool':
        return this.bool();
      case 'true':
        return true;
    }

    if (type.substr(0, 6).toLowerCase() === 'vector') {
      if (type.charAt(0) === 'V') {
        let constructor = this.int();
        let constructorCmp = uintToInt(constructor);

        if (constructorCmp != 0x1cb5c415) {
          throw new Error('Invalid vector constructor ' + constructorCmp);
        }
      }

      const length = this.int();
      const result = [];

      if (!length) {
        return result;
      }

      const itemType = type.substr(7, type.length - 8); // for "Vector<itemType>"
      for (let i = 0; i < length; i++) {
        result.push(this.predicate(itemType));
      }

      return result;
    }

    const isContainer = type.charAt(0) === '%';

    const constructorId = isContainer ? 1538843921 : this.uint32();

    if (constructorId === 812830625) {
      const gzipBytes = this.bytes();
      const uncompressed = pako.inflate(gzipBytes);
      const deserializer = new TLDeserializer(uncompressed.buffer);

      return deserializer.predicate(type);
    }

    const constructor = schema.constructorsById[constructorId];

    if (!constructor) {
      throw new Error(
        `Not found constructor for id ${constructorId} and type ${type}`
      );
    }

    const result = { _: constructor.predicate, pFlags: {} };

    constructor.params.forEach(param => {
      let paramType = param.type;
      const isFlag = paramType.indexOf('?') !== -1;

      if (isFlag) {
        const condType = paramType.split('?');
        const fieldBit = condType[0].split('.');
        if (!(result[fieldBit[0]] & (1 << fieldBit[1]))) {
          return;
        }
        paramType = condType[1];
      }

      const value = this.predicate(paramType);

      if (isFlag && paramType === 'true') {
        result.pFlags[param.name] = value;
      } else {
        result[param.name] = value;
      }
    });

    return result;
  }
}

module.exports = TLDeserializer;
