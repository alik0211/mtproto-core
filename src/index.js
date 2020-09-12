const EventEmitter = require('events');
const { RPC } = require('./rpc');
const { Storage } = require('./storage');

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

class MTProto {
  constructor(options) {
    const { api_id, api_hash, test = false, customLocalStorage } = options;

    this.api_id = api_id;
    this.api_hash = api_hash;

    this.initConnectionParams = {};

    this.dcList = test ? TEST_DC_LIST : PRODUCTION_DC_LIST;

    this.customLocalStorage = customLocalStorage;

    this.updates = new EventEmitter();

    this.rpcs = {};

    this.storage = new Storage('', { customLocalStorage });
  }

  async call(method, params = {}, options = {}) {
    const { syncAuth = true } = options;

    const dcId = options.dcId || (await this.storage.get('defaultDcId')) || 2;

    this.createRPC(dcId);

    return this.rpcs[dcId].call(method, params).then(result => {
      if (syncAuth && result._ === 'auth.authorization') {
        return this.syncAuth(dcId).then(() => result);
      }

      return result;
    });
  }

  syncAuth(dcId) {
    const promises = [];

    this.dcList.forEach(dc => {
      if (dcId === dc.id) {
        return;
      }

      const promise = this.call(
        'auth.exportAuthorization',
        {
          dc_id: dc.id,
        },
        { dcId }
      )
        .then(result => {
          return this.call(
            'auth.importAuthorization',
            {
              id: result.id,
              bytes: result.bytes,
            },
            { dcId: dc.id, syncAuth: false }
          );
        })
        .catch(error => {
          console.warn(`Error when copy auth to DC ${dc.id}:`, error);

          return Promise.resolve();
        });

      promises.push(promise);
    });

    return Promise.all(promises);
  }

  setDefaultDc(dcId) {
    return this.storage.set('defaultDcId', dcId);
  }

  createRPC(dcId) {
    if (dcId in this.rpcs) {
      return;
    }

    const dc = this.dcList.find(({ id }) => id === dcId);

    if (!dc) {
      console.warn(`Don't find DC ${dcId}`);

      return;
    }

    const { api_id, api_hash, updates, customLocalStorage } = this;

    this.rpcs[dcId] = new RPC({
      api_id,
      api_hash,
      dc,
      updates,
      storage: new Storage(dc.id, { customLocalStorage }),
      getInitConnectionParams: () => this.initConnectionParams,
    });
  }

  updateInitConnectionParams(params) {
    this.initConnectionParams = params;
  }
}

module.exports = { MTProto };
