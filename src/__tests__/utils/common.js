const { getRandomBytes } = require('../../utils/common');

describe('getRandomBytes', function() {
  const length = 16;
  const result = getRandomBytes(length);

  it('return Uint8Array', function() {
    expect(result).toBeInstanceOf(Uint8Array);
  });

  it('return current length', function() {
    expect(result.length).toBe(length);
  });
});
