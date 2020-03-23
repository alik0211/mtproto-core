const bigInt = require('big-integer');
const { Zlib } = require('zlibjs/bin/gunzip.min.js');
const BigInteger = require('jsbn').BigInteger;
const {
  eGCD_,
  greater,
  divide_,
  str2bigInt,
  equalsInt,
  isZero,
  bigInt2str,
  copy_,
  copyInt_,
  rightShift_,
  sub_,
  add_,
  one,
  bpe,
} = require('leemon');

function bigIntToBytes(bigInt, length) {
  return hexToBytes(bigInt.toString(16), length);
}

function hexToBytes(str, len) {
  if (!len) {
    len = Math.ceil(str.length / 2);
  }
  while (str.length < len * 2) {
    str = '0' + str;
  }
  const buf = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buf[i] = parseInt(str.slice(i * 2, i * 2 + 2), 16);
  }
  return buf;
}

function bytesToBigInt(bytes) {
  const digits = new Array(bytes.byteLength);
  for (let i = 0; i < bytes.byteLength; i++) {
    digits[i] =
      bytes[i] < 16 ? '0' + bytes[i].toString(16) : bytes[i].toString(16);
  }
  return bigInt(digits.join(''), 16);
}

function getRandomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

function xorBytes(bytes1, bytes2) {
  let bytes = new Uint8Array(bytes1.byteLength);
  for (let i = 0; i < bytes1.byteLength; i++) {
    bytes[i] = bytes1[i] ^ bytes2[i];
  }
  return bytes;
}

function concatBytes(...arrays) {
  let totalLength = 0;
  for (let bytes of arrays) {
    if (typeof bytes === 'number') {
      // padding
      totalLength = Math.ceil(totalLength / bytes) * bytes;
    } else {
      totalLength += bytes.byteLength;
    }
  }
  let merged = new Uint8Array(totalLength);
  let offset = 0;
  for (let bytes of arrays) {
    if (typeof bytes === 'number') {
      merged.set(getRandomBytes(totalLength - offset), offset);
    } else {
      merged.set(
        bytes instanceof ArrayBuffer ? new Uint8Array(bytes) : bytes,
        offset
      );
      offset += bytes.byteLength;
    }
  }
  return merged;
}

function bytesToHex(bytes) {
  bytes = bytes || [];
  var arr = [];
  for (var i = 0; i < bytes.length; i++) {
    arr.push((bytes[i] < 16 ? '0' : '') + (bytes[i] || 0).toString(16));
  }
  return arr.join('');
}

function bytesFromHex(hexString) {
  var len = hexString.length,
    i;
  var start = 0;
  var bytes = [];

  if (hexString.length % 2) {
    bytes.push(parseInt(hexString.charAt(0), 16));
    start++;
  }

  for (i = start; i < len; i += 2) {
    bytes.push(parseInt(hexString.substr(i, 2), 16));
  }

  return bytes;
}

function bytesCmp(bytes1, bytes2) {
  var len = bytes1.length;
  if (len != bytes2.length) {
    return false;
  }

  for (var i = 0; i < len; i++) {
    if (bytes1[i] != bytes2[i]) {
      return false;
    }
  }
  return true;
}

function bytesXor(bytes1, bytes2) {
  var len = bytes1.length;
  var bytes = [];

  for (var i = 0; i < len; ++i) {
    bytes[i] = bytes1[i] ^ bytes2[i];
  }

  return bytes;
}

function bytesFromWords(wordArray) {
  var words = wordArray.words;
  var sigBytes = wordArray.sigBytes;
  var bytes = [];

  for (var i = 0; i < sigBytes; i++) {
    bytes.push((words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff);
  }

  return bytes;
}

function bytesFromBigInt(bigInt, len) {
  var bytes = bigInt.toByteArray();

  if (len && bytes.length < len) {
    var padding = [];
    for (var i = 0, needPadding = len - bytes.length; i < needPadding; i++) {
      padding[i] = 0;
    }
    if (bytes instanceof ArrayBuffer) {
      bytes = bufferConcat(padding, bytes);
    } else {
      bytes = padding.concat(bytes);
    }
  } else {
    while (!bytes[0] && (!len || bytes.length > len)) {
      bytes = bytes.slice(1);
    }
  }

  return bytes;
}

function bytesFromLeemonBigInt(bigInt, len) {
  var str = bigInt2str(bigInt, 16);
  return bytesFromHex(str);
}

function bytesToArrayBuffer(b) {
  return new Uint8Array(b).buffer;
}

function convertToUint8Array(bytes) {
  if (bytes.buffer !== undefined) {
    return bytes;
  }
  return new Uint8Array(bytes);
}

function convertToByteArray(bytes) {
  if (Array.isArray(bytes)) {
    return bytes;
  }
  bytes = convertToUint8Array(bytes);
  var newBytes = [];
  for (var i = 0, len = bytes.length; i < len; i++) {
    newBytes.push(bytes[i]);
  }
  return newBytes;
}

function bufferConcat(buffer1, buffer2) {
  var l1 = buffer1.byteLength || buffer1.length;
  var l2 = buffer2.byteLength || buffer2.length;
  var tmp = new Uint8Array(l1 + l2);
  tmp.set(
    buffer1 instanceof ArrayBuffer ? new Uint8Array(buffer1) : buffer1,
    0
  );
  tmp.set(
    buffer2 instanceof ArrayBuffer ? new Uint8Array(buffer2) : buffer2,
    l1
  );

  return tmp.buffer;
}

function longToInts(sLong) {
  var divRem = new BigInteger(sLong, 10).divideAndRemainder(
    new BigInteger((0x100000000).toString(16), 16)
  );

  return [divRem[0].intValue(), divRem[1].intValue()];
}

function longToBytes(sLong) {
  return bytesFromWords({ words: longToInts(sLong), sigBytes: 8 }).reverse();
}

function longFromInts(high, low) {
  return bigInt(high)
    .shiftLeft(32)
    .add(bigInt(low))
    .toString(10);
}

function intToUint(value) {
  value = +value;

  return value < 0 ? value + 4294967296 : value;
}

function uintToInt(val) {
  if (val > 2147483647) {
    val = val - 4294967296;
  }
  return val;
}

function rsaEncrypt(publicKey, bytes) {
  const encryptedBigInt = bytesToBigInt(bytes).modPow(
    bigInt(publicKey.exponent, 16),
    bigInt(publicKey.modulus, 16)
  );

  return bigIntToBytes(encryptedBigInt, 256);
}

function gzipUncompress(bytes) {
  // console.log('Gzip uncompress start')
  var result = new Zlib.Gunzip(bytes).decompress();
  // console.log('Gzip uncompress finish')
  return result;
}

function getRandomInt(maxValue) {
  return Math.floor(Math.random() * maxValue);
}

function pqPrimeFactorization(pqBytes) {
  var what = new BigInteger(pqBytes);
  var result = false;

  // console.log(dT(), 'PQ start', pqBytes, what.toString(16), what.bitLength())

  try {
    result = pqPrimeLeemon(
      str2bigInt(what.toString(16), 16, Math.ceil(64 / bpe) + 1)
    );
  } catch (e) {
    console.error('Pq leemon Exception', e);
  }

  if (result === false && what.bitLength() <= 64) {
    // console.time('PQ long')
    try {
      result = pqPrimeLong(goog.math.Long.fromString(what.toString(16), 16));
    } catch (e) {
      console.error('Pq long Exception', e);
    }
    // console.timeEnd('PQ long')
  }
  // console.log(result)

  if (result === false) {
    // console.time('pq BigInt')
    result = pqPrimeBigInteger(what);
    // console.timeEnd('pq BigInt')
  }

  // console.log(dT(), 'PQ finish')

  return result;
}

function pqPrimeBigInteger(what) {
  var it = 0,
    g;
  for (var i = 0; i < 3; i++) {
    var q = (getRandomInt(128) & 15) + 17;
    var x = new BigInteger((getRandomInt(1000000000) + 1).toString(16), 16);
    var y = x.clone();
    var lim = 1 << (i + 18);

    for (var j = 1; j < lim; j++) {
      ++it;
      var a = x.clone();
      var b = x.clone();
      var c = new BigInteger(q.toString(16), 16);

      while (!b.equals(BigInteger.ZERO)) {
        if (!b.and(BigInteger.ONE).equals(BigInteger.ZERO)) {
          c = c.add(a);
          if (c.compareTo(what) > 0) {
            c = c.subtract(what);
          }
        }
        a = a.add(a);
        if (a.compareTo(what) > 0) {
          a = a.subtract(what);
        }
        b = b.shiftRight(1);
      }

      x = c.clone();
      var z = x.compareTo(y) < 0 ? y.subtract(x) : x.subtract(y);
      g = z.gcd(what);
      if (!g.equals(BigInteger.ONE)) {
        break;
      }
      if ((j & (j - 1)) == 0) {
        y = x.clone();
      }
    }
    if (g.compareTo(BigInteger.ONE) > 0) {
      break;
    }
  }

  var f = what.divide(g),
    P,
    Q;

  if (g.compareTo(f) > 0) {
    P = f;
    Q = g;
  } else {
    P = g;
    Q = f;
  }

  return [bytesFromBigInt(P), bytesFromBigInt(Q), it];
}

function gcdLong(a, b) {
  while (a.notEquals(goog.math.Long.ZERO) && b.notEquals(goog.math.Long.ZERO)) {
    while (b.and(goog.math.Long.ONE).equals(goog.math.Long.ZERO)) {
      b = b.shiftRight(1);
    }
    while (a.and(goog.math.Long.ONE).equals(goog.math.Long.ZERO)) {
      a = a.shiftRight(1);
    }
    if (a.compare(b) > 0) {
      a = a.subtract(b);
    } else {
      b = b.subtract(a);
    }
  }
  return b.equals(goog.math.Long.ZERO) ? a : b;
}

function pqPrimeLong(what) {
  var it = 0,
    g;
  for (var i = 0; i < 3; i++) {
    var q = goog.math.Long.fromInt((getRandomInt(128) & 15) + 17);
    var x = goog.math.Long.fromInt(getRandomInt(1000000000) + 1);
    var y = x;
    var lim = 1 << (i + 18);

    for (var j = 1; j < lim; j++) {
      ++it;
      var a = x;
      var b = x;
      var c = q;

      while (b.notEquals(goog.math.Long.ZERO)) {
        if (b.and(goog.math.Long.ONE).notEquals(goog.math.Long.ZERO)) {
          c = c.add(a);
          if (c.compare(what) > 0) {
            c = c.subtract(what);
          }
        }
        a = a.add(a);
        if (a.compare(what) > 0) {
          a = a.subtract(what);
        }
        b = b.shiftRight(1);
      }

      x = c;
      var z = x.compare(y) < 0 ? y.subtract(x) : x.subtract(y);
      g = gcdLong(z, what);
      if (g.notEquals(goog.math.Long.ONE)) {
        break;
      }
      if ((j & (j - 1)) == 0) {
        y = x;
      }
    }
    if (g.compare(goog.math.Long.ONE) > 0) {
      break;
    }
  }

  var f = what.div(g),
    P,
    Q;

  if (g.compare(f) > 0) {
    P = f;
    Q = g;
  } else {
    P = g;
    Q = f;
  }

  return [bytesFromHex(P.toString(16)), bytesFromHex(Q.toString(16)), it];
}

function pqPrimeLeemon(what) {
  var minBits = 64;
  var minLen = Math.ceil(minBits / bpe) + 1;
  var it = 0;
  var i, q;
  var j, lim;
  var g, P;
  var Q;
  var a = new Array(minLen);
  var b = new Array(minLen);
  var c = new Array(minLen);
  var g = new Array(minLen);
  var z = new Array(minLen);
  var x = new Array(minLen);
  var y = new Array(minLen);

  for (i = 0; i < 3; i++) {
    q = (getRandomInt(128) & 15) + 17;
    copyInt_(x, getRandomInt(1000000000) + 1);
    copy_(y, x);
    lim = 1 << (i + 18);

    for (j = 1; j < lim; j++) {
      ++it;
      copy_(a, x);
      copy_(b, x);
      copyInt_(c, q);

      while (!isZero(b)) {
        if (b[0] & 1) {
          add_(c, a);
          if (greater(c, what)) {
            sub_(c, what);
          }
        }
        add_(a, a);
        if (greater(a, what)) {
          sub_(a, what);
        }
        rightShift_(b, 1);
      }

      copy_(x, c);
      if (greater(x, y)) {
        copy_(z, x);
        sub_(z, y);
      } else {
        copy_(z, y);
        sub_(z, x);
      }
      eGCD_(z, what, g, a, b);
      if (!equalsInt(g, 1)) {
        break;
      }
      if ((j & (j - 1)) == 0) {
        copy_(y, x);
      }
    }
    if (greater(g, one)) {
      break;
    }
  }

  divide_(what, g, x, y);

  if (greater(g, x)) {
    P = x;
    Q = g;
  } else {
    P = g;
    Q = x;
  }

  // console.log(dT(), 'done', bigInt2str(what, 10), bigInt2str(P, 10), bigInt2str(Q, 10))

  return [bytesFromLeemonBigInt(P), bytesFromLeemonBigInt(Q), it];
}

function getNonce() {
  const nonce = [];
  for (var i = 0; i < 16; i++) {
    nonce.push(getRandomInt(0xff));
  }
  return nonce;
}

module.exports = {
  bigIntToBytes,
  hexToBytes,
  bytesToBigInt,
  getRandomBytes,
  xorBytes,
  concatBytes,
  bytesToHex,
  bytesFromHex,
  bytesCmp,
  bytesXor,
  bytesFromWords,
  bytesFromBigInt,
  bytesFromLeemonBigInt,
  bytesToArrayBuffer,
  convertToUint8Array,
  convertToByteArray,
  bufferConcat,
  longToInts,
  longToBytes,
  longFromInts,
  intToUint,
  uintToInt,
  rsaEncrypt,
  gzipUncompress,
  getRandomInt,
  pqPrimeFactorization,
  pqPrimeBigInteger,
  gcdLong,
  pqPrimeLong,
  pqPrimeLeemon,
  getNonce,
};
