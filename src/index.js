const bigInt = require('big-integer');
const debounce = require('lodash.debounce');
const EventEmitter = require('events');
const Storage = require('./storage');
const { Transport } = require('./transport');
const TLSerializer = require('./tl/serializer');
const TLDeserializer = require('./tl/deserializer');
const {
  bytesIsEqual,
  bytesToHex,
  getRandomBytes,
  concatBytes,
  bytesToBigInt,
  bigIntToBytes,
  longToBytes,
  longFromInts,
  getRandomInt,
  convertToByteArray,
  xorBytes,
} = require('./utils/common');
const { pqPrimeFactorization } = require('./utils/pq');
const { AES, RSA, SHA1, SHA256 } = require('./utils/crypto');
const { getRsaKeyByFingerprints } = require('./utils/rsa');
const { RPC } = require('./rpc');

const TEST_DC_LIST = [
  {
    id: 1,
    ip: '149.154.175.10',
    port: 80,
    test: true,
  },
  {
    id: 2,
    ip: '149.154.167.40',
    port: 443,
    test: true,
  },
  {
    id: 3,
    ip: '149.154.175.117',
    port: 443,
    test: true,
  },
];

const PRODUCTION_DC_LIST = [
  {
    id: 1,
    ip: '149.154.175.53',
    port: 443,
  },
  {
    id: 2,
    ip: '149.154.167.51',
    port: 443,
  },
  {
    id: 3,
    ip: '149.154.175.100',
    port: 443,
  },
  {
    id: 4,
    ip: '149.154.167.92',
    port: 443,
  },
  {
    id: 5,
    ip: '91.108.56.128',
    port: 443,
  },
];

const DEFAULT_DC_ID = 2;

class MTProto {
  constructor({ api_id, api_hash, test = false }) {
    this.api_id = api_id;
    this.api_hash = api_hash;

    this.dcList = test ? TEST_DC_LIST : PRODUCTION_DC_LIST;

    this.rpcs = {};
  }

  call(method, params = {}, options = {}) {
    const { dcId = DEFAULT_DC_ID, syncAuth = false } = options;

    if (!this.rpcs[dcId]) {
      const { api_id, api_hash } = this;
      const dc = this.dcList.find(({ id }) => id === dcId);

      if (!dc) {
        throw Error(`Don't find DC ${dcId}`);
      }

      this.rpcs[dcId] = new RPC({ api_id, api_hash, dc });
    }

    return this.rpcs[dcId].call(method, params).then(result => {
      if (syncAuth && result._ === 'auth.authorization') {
        return this.syncAuth(dcId).then(syncResult => {
          return result;
        });
      }

      return result;
    });
  }

  syncAuth(dcId) {
    // console.log(`Sync from DC ${dcId}`);
    const promises = [];

    this.dcList.forEach(dc => {
      if (dcId === dc.id) {
        return;
      }

      const promise = this.call('auth.exportAuthorization', {
        dc_id: dc.id,
      }).then(result => {
        return this.call(
          'auth.importAuthorization',
          {
            id: result.id,
            bytes: result.bytes,
          },
          { dcId: dc.id }
        );
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  }
}

module.exports = { MTProto };
