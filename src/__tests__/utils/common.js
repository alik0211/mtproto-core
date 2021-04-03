const bigInt = require('big-integer');
const {
  bytesIsEqual,
  bigIntToBytes,
  hexToBytesRaw,
  xorBytes,
  concatBytes,
  bytesToHex,
  getRandomInt,
} = require('../../utils/common');

describe('bytesIsEqual', function () {
  it('return false if the length is different', function () {
    const firstBytes = new Uint8Array([]);
    const secondBytes = new Uint8Array([255]);

    expect(bytesIsEqual(firstBytes, secondBytes)).toBe(false);
  });

  it("return false if the bytes don't equal", function () {
    const firstBytes = new Uint8Array([127]);
    const secondBytes = new Uint8Array([255]);

    expect(bytesIsEqual(firstBytes, secondBytes)).toBe(false);
  });

  it('return true if the bytes is equal', function () {
    const firstBytes = new Uint8Array([255]);
    const secondBytes = new Uint8Array([255]);

    expect(bytesIsEqual(firstBytes, secondBytes)).toBe(true);
  });
});

describe('bigIntToBytes', function () {
  const reslut = bigIntToBytes(bigInt(0xffffffff));
  const expectedResult = new Uint8Array([255, 255, 255, 255]);

  it('return Uint8Array', function () {
    expect(expectedResult).toBeInstanceOf(Uint8Array);
  });

  it('return correct length', function () {
    expect(reslut.length).toBe(expectedResult.length);
  });

  it('return correct result', function () {
    expect(reslut).toEqual(expectedResult);
  });
});

describe('hexToBytesRaw', function () {
  const expectedResult = [0, 0, 0, 0, 255, 255, 255, 255];
  const reslut = hexToBytesRaw('ffffffff', expectedResult.length);

  it('return Array', function () {
    expect(Array.isArray(reslut)).toBe(true);
  });

  it('return correct length', function () {
    expect(reslut.length).toBe(expectedResult.length);
  });

  it('return correct result', function () {
    expect(reslut).toEqual(expectedResult);
  });
});

describe('xorBytes', function () {
  const firstBytes = new Uint8Array([15, 138, 218, 0]);
  const secondBytes = new Uint8Array([202, 210, 23, 76]);

  const expectedLength = 4;
  const expectedResult = new Uint8Array([197, 88, 205, 76]);

  const result = xorBytes(firstBytes, secondBytes);

  it('return Uint8Array', function () {
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('return correct length', function () {
    expect(result.length).toBe(expectedLength);
  });

  it('return correct result', function () {
    expect(result).toEqual(expectedResult);
  });
});

describe('concatBytes', function () {
  const expectedResult = new Uint8Array([1, 2, 3, 4]);

  const result = concatBytes([1], [2], [3], [4]);

  it('return Uint8Array', function () {
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('return correct length', function () {
    expect(result.length).toBe(expectedResult.length);
  });

  it('return correct result', function () {
    expect(result).toEqual(expectedResult);
  });
});

describe('bytesToHex', function () {
  const bytes = [0, 14, 127, 255];
  const result = bytesToHex(bytes);
  const expectedResult = '000e7fff';

  it('return string', function () {
    expect(typeof result).toBe('string');
  });

  it('return correct length', function () {
    expect(result.length).toBe(bytes.length * 2);
  });

  it('return correct result', function () {
    expect(result).toBe(expectedResult);
  });
});

describe('getRandomInt', function () {
  const max = 1024;
  const result = getRandomInt(max);

  it('result does not exceed the maximum value', function () {
    expect(result).toBeLessThanOrEqual(max);
  });
});
