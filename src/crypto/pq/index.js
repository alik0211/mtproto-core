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
const {
  hexToBytes,
  bytesToBigInt,
  getRandomInt,
} = require('../../utils/common');

function leemonBigIntToBytes(bigInt) {
  const str = bigInt2str(bigInt, 16);

  return hexToBytes(str);
}

function pqLeemon(what) {
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

  return [leemonBigIntToBytes(P), leemonBigIntToBytes(Q), it];
}

function pqPrimeFactorization(pqBytes) {
  const pq = bytesToBigInt(pqBytes);
  let result = null;

  try {
    result = pqLeemon(str2bigInt(pq.toString(16), 16, Math.ceil(64 / bpe) + 1));
  } catch (error) {
    console.error(`PQ leemon factorization: ${error}`);
  }

  return result;
}

module.exports = pqPrimeFactorization;
