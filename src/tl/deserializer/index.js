const pako = require('pako');
const bigInt = require('big-integer');
const { schema } = require('../../../scheme');
const { uintToInt, intsToLong } = require('../../utils/common');

class TLDeserializer {
  constructor(buffer, options = {}) {
    const { predicatesHandlers = {} } = options;

    this.buffer = buffer;
    this.byteView = new Uint8Array(this.buffer);
    this.dataView = new DataView(
      this.buffer,
      this.byteView.byteOffset,
      this.byteView.byteLength
    );

    this.offset = 0;

    this.predicatesHandlers = predicatesHandlers;
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

  int512() {
    return this.byteView.slice(this.offset, (this.offset += 64));
  }

  double() {
    const value = this.data.getFloat64(this.offset, true);
    this.offset += 8;
    return value;
  }

  bool() {
    const id = this.uint32();

    if (id === schema.constructorsIdsByPredicate.boolTrue) {
      return true;
    }

    if (id === schema.constructorsIdsByPredicate.boolFalse) {
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

    while (this.offset % 4 !== 0) {
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
        let constructorId = this.uint32();

        if (constructorId !== 0x1cb5c415) {
          throw new Error('Invalid vector constructor id ' + constructorId);
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

    const result = { _: constructor.predicate };

    if (result._ in this.predicatesHandlers) {
      this.predicatesHandlers[result._].call(this, result);
    } else {
      constructor.params.forEach(param => {
        let paramType = param.type;

        if (paramType === '#' && result.pFlags === undefined) {
          result.pFlags = {};
        }

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
    }

    return result;
  }
}

module.exports = TLDeserializer;
