const { TLSerialization } = require('../../tl');
const TLSerializer = require('../../tl/serializer');

const int128 = [
  95,
  208,
  59,
  131,
  176,
  157,
  240,
  82,
  154,
  29,
  66,
  191,
  191,
  11,
  112,
  169,
];

const int256 = [
  209,
  95,
  1,
  167,
  46,
  73,
  221,
  41,
  13,
  0,
  217,
  102,
  153,
  123,
  226,
  188,
  9,
  212,
  63,
  150,
  91,
  125,
  186,
  3,
  192,
  188,
  39,
  161,
  85,
  9,
  198,
  251,
];

const long = [0, 0];

describe('TLSerializer', function() {
  describe('empty serializer', function() {
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

  describe('increase the buffer size if there is not enough space', function() {
    it('int', function() {
      const serializer = new TLSerializer({ maxLength: 0 });
      serializer.int(255);

      expect(serializer.maxLength).toBe(20);
    });

    it('int128', function() {
      const serializer = new TLSerializer({ maxLength: 0 });
      serializer.int128(int128);

      expect(serializer.maxLength).toBe(32);
    });

    it('int256', function() {
      const serializer = new TLSerializer({ maxLength: 0 });
      serializer.int256(int256);

      expect(serializer.maxLength).toBe(48);
    });

    it('long', function() {
      const serializer = new TLSerializer({ maxLength: 0 });
      serializer.long(long);

      expect(serializer.maxLength).toBe(20);
    });
  });

  describe('int', function() {
    const serializer = new TLSerializer();
    serializer.int(0);

    it('getArray method', function() {
      const array = serializer.getArray();
      const expectedArray = new Int32Array([0]);

      expect(array).toEqual(expectedArray);
      expect(array.length).toBe(expectedArray.length);
    });
  });

  describe('int128', function() {
    const serializer = new TLSerializer();
    serializer.int128(int128);

    it('getArray method', function() {
      const array = serializer.getArray();
      const expectedArray = new Int32Array([
        -2093232033,
        1391500720,
        -1086186086,
        -1452274753,
      ]);

      expect(array).toEqual(expectedArray);
      expect(array.length).toBe(4);
    });
  });

  describe('int256', function() {
    const serializer = new TLSerializer();
    serializer.int256(int256);

    it('getArray method', function() {
      const array = serializer.getArray();
      const expectedArray = new Int32Array([
        -1493082159,
        702368046,
        1725497357,
        -1126007911,
        -1774201847,
        62553435,
        -1591231296,
        -70907563,
      ]);

      expect(array).toEqual(expectedArray);
      expect(array.length).toBe(8);
    });
  });

  describe('uint32', function() {});

  describe('string', function() {
    const serializer = new TLSerializer();
    serializer.string('abyz');

    const bytes = serializer.getBytes();
    const expectedBytes = [4, 97, 98, 121, 122, 0, 0, 0];

    it('getBytes method', function() {
      expect(bytes).toEqual(expectedBytes);
      expect(bytes.length).toEqual(expectedBytes.length);
    });
  });

  describe('long', function() {
    const serializer = new TLSerializer();
    serializer.long(long);

    const bytes = serializer.getBytes();

    it('long', function() {
      expect(bytes).toEqual([0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });

  describe('bytes', function() {});

  describe('method http_wait', function() {
    const serializer = new TLSerializer({ mtproto: true });
    serializer.method('http_wait', {
      max_delay: 500,
      wait_after: 150,
      max_wait: 1000,
    });

    it('getBytes method', function() {
      const bytes = serializer.getBytes();
      const expectedBytes = [
        159,
        53,
        153,
        146,
        244,
        1,
        0,
        0,
        150,
        0,
        0,
        0,
        232,
        3,
        0,
        0,
      ];

      expect(bytes).toEqual(expectedBytes);
      expect(bytes.length).toBe(expectedBytes.length);
    });
  });
});
