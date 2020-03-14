const bigInt = require('big-integer');
const config = require('../config');
const {
  bigint,
  bigStringInt,
  bytesToHex,
  bytesToArrayBuffer,
  intToUint,
  uintToInt,
  gzipUncompress,
} = require('../utils');

function TLDeserializer(buffer, options = {}) {
  const { isPlain = false, override = {}, mtproto = false } = options;

  this.override = override;

  this.buffer = buffer;
  this.byteView = new Uint8Array(this.buffer);
  this.dataView = new DataView(
    this.buffer,
    this.byteView.byteOffset,
    this.byteView.byteLength
  );

  this.mtproto = mtproto;
  this.schema = mtproto ? config.schema.mtproto : config.schema.api;

  if (!isPlain) {
    if (this.byteView[0] >= 1 && this.byteView[0] <= 0x7e) {
      // this.totalLength = this.byteView[0] * 4;
      this.offset = 1;
      this.paddingTo = 1;
    } else if (this.byteView[0] === 0x7f) {
      if (this.byteView.byteLength < 4) {
        throw Error('Buffer is too small');
      }
      // this.totalLength =
      //   (this.byteView[1] +
      //     (this.byteView[2] << 8) +
      //     (this.byteView[3] << 16)) *
      //   4;
      this.offset = 4;
      this.paddingTo = 0;
    } else {
      throw Error(`Unexpected first byte: ${this.byteView[0]}`);
    }
  } else {
    this.offset = 0;
    this.paddingTo = 0;
  }

  return this;
}

TLDeserializer.prototype.int = function() {
  const value = this.dataView.getInt32(this.offset, true);
  this.offset += 4;
  return value;
};

TLDeserializer.prototype.uint32 = function() {
  const value = this.dataView.getUint32(this.offset, true);
  this.offset += 4;
  return value;
};

TLDeserializer.prototype.long = function() {
  const iLow = this.uint32();
  const iHigh = this.uint32();

  const result = bigInt(iHigh)
    .shiftLeft(32)
    .add(bigInt(iLow))
    .toString();

  return result;
};

TLDeserializer.prototype.double = function() {
  const value = this.data.getFloat64(this.offset, true);
  this.offset += 8;
  return value;
};

// TLDeserializer.prototype.fetchLong = function(field) {
//   const iLow = this.uint32();
//   const iHigh = this.uint32();

//   const longDec = bigint(iHigh)
//     .shiftLeft(32)
//     .add(bigint(iLow))
//     .toString();

//   return longDec;
// };

// TODO: Rewrite
TLDeserializer.prototype.fetchBool = function(field) {
  var i = this.int((field || '') + ':bool');
  if (i == 0x997275b5) {
    return true;
  } else if (i == 0xbc799737) {
    return false;
  }

  this.offset -= 4;
  return this.fetchObject('Object', field);
};

// TODO: Rewrite
TLDeserializer.prototype.fetchString = function(field) {
  var len = this.byteView[this.offset++];

  if (len == 254) {
    var len =
      this.byteView[this.offset++] |
      (this.byteView[this.offset++] << 8) |
      (this.byteView[this.offset++] << 16);
  }

  var sUTF8 = '';
  for (var i = 0; i < len; i++) {
    sUTF8 += String.fromCharCode(this.byteView[this.offset++]);
  }

  // Padding
  while (this.offset % 4) {
    this.offset++;
  }

  try {
    var s = decodeURIComponent(escape(sUTF8));
  } catch (e) {
    var s = sUTF8;
  }

  this.debug && console.log('<<<', s, (field || '') + ':string');

  return s;
};

TLDeserializer.prototype.bytes = function(field) {
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
};

// TODO: Rewrite
TLDeserializer.prototype.fetchIntBytes = function(bits, typed, field) {
  if (bits % 32) {
    throw new Error('Invalid bits: ' + bits);
  }

  var len = bits / 8;
  if (typed) {
    var result = this.byteView.subarray(this.offset, this.offset + len);
    this.offset += len;
    return result;
  }

  var bytes = [];
  for (var i = 0; i < len; i++) {
    bytes.push(this.byteView[this.offset++]);
  }

  this.debug &&
    console.log('<<<', bytesToHex(bytes), (field || '') + ':int' + bits);

  return bytes;
};

// TODO: Rewrite
TLDeserializer.prototype.fetchRawBytes = function(len, typed, field) {
  if (len === false) {
    len = this.int((field || '') + '_length');
    if (len > this.byteView.byteLength) {
      throw new Error(
        'Invalid raw bytes length: ' +
          len +
          ', buffer len: ' +
          this.byteView.byteLength
      );
    }
  }

  if (typed) {
    var bytes = new Uint8Array(len);
    bytes.set(this.byteView.subarray(this.offset, this.offset + len));
    this.offset += len;
    return bytes;
  }

  var bytes = [];
  for (var i = 0; i < len; i++) {
    bytes.push(this.byteView[this.offset++]);
  }

  this.debug && console.log('<<<', bytesToHex(bytes), field || '');

  return bytes;
};

// TLDeserializer.prototype.fetchObject = function(type, field) {
//   switch (type) {
//     case '#':
//     case 'int':
//       return this.int(field);
//     case 'long':
//       return this.fetchLong(field);
//     case 'int128':
//       return this.fetchIntBytes(128, false, field);
//     case 'int256':
//       return this.fetchIntBytes(256, false, field);
//     case 'int512':
//       return this.fetchIntBytes(512, false, field);
//     case 'string':
//       return this.fetchString(field);
//     case 'bytes':
//       return this.fetchBytes(field);
//     case 'double':
//       return this.double(field);
//     case 'Bool':
//       return this.fetchBool(field);
//     case 'true':
//       return true;
//   }

//   field = field || type || 'Object';

//   if (type.substr(0, 6) == 'Vector' || type.substr(0, 6) == 'vector') {
//     if (type.charAt(0) == 'V') {
//       var constructor = this.int(field + '[id]');
//       var constructorCmp = uintToInt(constructor);

//       if (constructorCmp == 0x3072cfa1) {
//         // Gzip packed
//         var compressed = this.fetchBytes(field + '[packed_string]');
//         var uncompressed = gzipUncompress(compressed);
//         var buffer = bytesToArrayBuffer(uncompressed);
//         var newDeserializer = new TLDeserializer(buffer);

//         return newDeserializer.fetchObject(type, field);
//       }
//       if (constructorCmp != 0x1cb5c415) {
//         throw new Error('Invalid vector constructor ' + constructor);
//       }
//     }
//     var len = this.int(field + '[count]');
//     var result = [];
//     if (len > 0) {
//       var itemType = type.substr(7, type.length - 8); // for "Vector<itemType>"
//       for (var i = 0; i < len; i++) {
//         result.push(this.fetchObject(itemType, field + '[' + i + ']'));
//       }
//     }

//     return result;
//   }

//   var schema = this.mtproto ? config.schema.mtproto : config.schema.api;
//   var predicate = false;
//   var constructorData = false;

//   if (type.charAt(0) == '%') {
//     var checkType = type.substr(1);
//     for (var i = 0; i < schema.constructors.length; i++) {
//       if (schema.constructors[i].type == checkType) {
//         constructorData = schema.constructors[i];
//         break;
//       }
//     }
//     if (!constructorData) {
//       throw new Error('Constructor not found for type: ' + type);
//     }
//   } else if (type.charAt(0) >= 97 && type.charAt(0) <= 122) {
//     for (var i = 0; i < schema.constructors.length; i++) {
//       if (schema.constructors[i].predicate == type) {
//         constructorData = schema.constructors[i];
//         break;
//       }
//     }
//     if (!constructorData) {
//       throw new Error('Constructor not found for predicate: ' + type);
//     }
//   } else {
//     var constructor = this.int(field + '[id]');
//     var constructorCmp = uintToInt(constructor);

//     if (constructorCmp == 0x3072cfa1) {
//       // Gzip packed
//       var compressed = this.fetchBytes(field + '[packed_string]');
//       var uncompressed = gzipUncompress(compressed);
//       var buffer = bytesToArrayBuffer(uncompressed);
//       var newDeserializer = new TLDeserializer(buffer);

//       return newDeserializer.fetchObject(type, field);
//     }

//     var index = schema.constructorsIndex;
//     if (!index) {
//       schema.constructorsIndex = index = {};
//       for (var i = 0; i < schema.constructors.length; i++) {
//         index[schema.constructors[i].id] = i;
//       }
//     }
//     var i = index[constructorCmp];
//     if (i) {
//       constructorData = schema.constructors[i];
//     }

//     var fallback = false;
//     if (!constructorData && this.mtproto) {
//       var schemaFallback = config.schema.api;
//       for (i = 0; i < schemaFallback.constructors.length; i++) {
//         if (schemaFallback.constructors[i].id == constructorCmp) {
//           constructorData = schemaFallback.constructors[i];

//           delete this.mtproto;
//           fallback = true;
//           break;
//         }
//       }
//     }
//     if (!constructorData) {
//       throw new Error(
//         'Constructor not found: ' +
//           constructor +
//           ' ' +
//           this.int() +
//           ' ' +
//           this.int()
//       );
//     }
//   }

//   predicate = constructorData.predicate;

//   var result = { _: predicate };
//   var overrideKey = (this.mtproto ? 'mt_' : '') + predicate;
//   var self = this;

//   if (this.override[overrideKey]) {
//     this.override[overrideKey].apply(this, [
//       result,
//       field + '[' + predicate + ']',
//     ]);
//   } else {
//     var i, param;
//     var type, isCond;
//     var condType, fieldBit;
//     var value;
//     var len = constructorData.params.length;
//     for (i = 0; i < len; i++) {
//       param = constructorData.params[i];
//       type = param.type;
//       if (type == '#' && result.pFlags === undefined) {
//         result.pFlags = {};
//       }
//       if ((isCond = type.indexOf('?') !== -1)) {
//         condType = type.split('?');
//         fieldBit = condType[0].split('.');
//         if (!(result[fieldBit[0]] & (1 << fieldBit[1]))) {
//           continue;
//         }
//         type = condType[1];
//       }

//       value = self.fetchObject(
//         type,
//         field + '[' + predicate + '][' + param.name + ']'
//       );

//       if (isCond && type === 'true') {
//         result.pFlags[param.name] = value;
//       } else {
//         result[param.name] = value;
//       }
//     }
//   }

//   if (fallback) {
//     this.mtproto = true;
//   }

//   return result;
// };

TLDeserializer.prototype.predicate = function(type, field) {
  // console.log(`type:`, type);
  switch (type) {
    case '#':
    case 'int':
      return this.int(field);
    case 'long':
      return this.long(field);
    case 'int128':
      return this.fetchIntBytes(128, false, field);
    case 'int256':
      return this.fetchIntBytes(256, false, field);
    case 'int512':
      return this.fetchIntBytes(512, false, field);
    case 'string':
      return this.fetchString(field);
    case 'bytes':
      return this.bytes(field);
    case 'double':
      return this.double(field);
    case 'Bool':
      return this.fetchBool(field);
    case 'true':
      return true;
  }

  if (type.substr(0, 6) === 'Vector') {
    let constructor = this.int(field + '[id]');
    let constructorCmp = uintToInt(constructor);

    if (constructorCmp != 0x1cb5c415) {
      throw new Error('Invalid vector constructor ' + constructorCmp);
    }

    const length = this.int();
    const result = [];

    if (!length) {
      return result;
    }

    const itemType = type.substr(7, type.length - 8); // for "Vector<itemType>"
    for (let i = 0; i < length; i++) {
      result.push(this.predicate(itemType, field + '[' + i + ']'));
    }

    return result;
  }

  const { schema } = this;

  const constructorId = this.int();

  const constructor = schema.constructors.find(item => {
    return +item.id === constructorId;
  });

  if (!constructor) {
    throw new Error(
      `Not found constructor for id ${constructorId} and type ${type}`
    );
  }

  const result = { _: constructor.predicate };

  constructor.params.forEach(param => {
    // TODO: handle flags
    const value = this.predicate(param.type);

    result[param.name] = value;
  });

  return result;
};

module.exports = TLDeserializer;
