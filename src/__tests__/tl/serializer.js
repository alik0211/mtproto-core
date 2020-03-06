const TLSerializer = require('../../tl/serializer');

describe('TLSerializer', function() {
  describe('Empty serializer', function() {
    const serializer = new TLSerializer();

    it('getArray method return value with a length of 0', function() {
      expect(serializer.getArray().length).toBe(0);
    });

    it('getBuffer method return value with a byteLength of 0', function() {
      expect(serializer.getBuffer().byteLength).toBe(0);
    });

    it('getBytes method return value with a length of 0', function() {
      expect(serializer.getBytes().length).toBe(0);
    });
  });
});
