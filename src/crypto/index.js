const bigInt = require('big-integer');
const {
  xorBytes,
  concatBytes,
  bigIntToBytes,
  bytesToBigInt,
} = require('../utils/common');
const RSA = require('../utils/rsa');

class Crypto {
  constructor({ SHA1, SHA256, PBKDF2, getRandomBytes }) {
    this.SHA1 = SHA1;
    this.SHA256 = SHA256;
    this.PBKDF2 = PBKDF2;
    this.getRandomBytes = getRandomBytes;

    this.rsa = new RSA({ SHA1 });
  }

  async getSRPParams({ g, p, salt1, salt2, gB, password }) {
    const H = this.SHA256;
    const SH = (data, salt) => {
      return this.SHA256(concatBytes(salt, data, salt));
    };
    const PH1 = async (password, salt1, salt2) => {
      return await SH(await SH(password, salt1), salt2);
    };
    const PH2 = async (password, salt1, salt2) => {
      return await SH(
        await this.PBKDF2(await PH1(password, salt1, salt2), salt1, 100000),
        salt2
      );
    };

    const encoder = new TextEncoder();

    const gBigInt = bigInt(g);
    const gBytes = bigIntToBytes(gBigInt, 256);
    const pBigInt = bytesToBigInt(p);
    const aBigInt = bytesToBigInt(this.getRandomBytes(256));
    const gABigInt = gBigInt.modPow(aBigInt, pBigInt);
    const gABytes = bigIntToBytes(gABigInt);
    const gBBytes = bytesToBigInt(gB);
    const [k, u, x] = await Promise.all([
      H(concatBytes(p, gBytes)),
      H(concatBytes(gABytes, gB)),
      PH2(encoder.encode(password), salt1, salt2),
    ]);
    const kBigInt = bytesToBigInt(k);
    const uBigInt = bytesToBigInt(u);
    const xBigInt = bytesToBigInt(x);
    const vBigInt = gBigInt.modPow(xBigInt, pBigInt);
    const kVBigInt = kBigInt.multiply(vBigInt).mod(pBigInt);
    let tBigInt = gBBytes.subtract(kVBigInt).mod(pBigInt);
    if (tBigInt.isNegative()) {
      tBigInt = tBigInt.add(pBigInt);
    }
    const sABigInt = tBigInt.modPow(
      aBigInt.add(uBigInt.multiply(xBigInt)),
      pBigInt
    );
    const sABytes = bigIntToBytes(sABigInt);
    const kA = await H(sABytes);
    const M1 = await H(
      concatBytes(
        xorBytes(await H(p), await H(gBytes)),
        await H(salt1),
        await H(salt2),
        gABytes,
        gB,
        kA
      )
    );

    return { A: gABytes, M1 };
  }
}

module.exports = Crypto;
