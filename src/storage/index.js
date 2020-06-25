const { getLocalStorage } = require('./local');

const cache = {};

class Storage {
  constructor(prefix, options = {}) {
    this._prefix = prefix;

    const { customLocalStorage = getLocalStorage() } = options;

    this.localStorage = customLocalStorage;
  }

  setPrefix(prefix) {
    this._prefix = prefix;
  }

  pSet(name, value) {
    const key = `${this._prefix}${name}`;

    return this.set(key, value);
  }

  async pGetBytes(name) {
    const result = await this.pGet(name);

    return new Uint8Array(result);
  }

  pGet(name) {
    const key = `${this._prefix}${name}`;

    return this.get(key);
  }

  async set(key, value) {
    cache[key] = value;

    const result = await this.localStorage.setItem(key, JSON.stringify(value));

    return result;
  }

  async get(key) {
    if (key in cache) {
      return cache[key];
    }

    const fromLocalStorage = await this.localStorage.getItem(key);

    if (fromLocalStorage) {
      cache[key] = JSON.parse(fromLocalStorage);

      return cache[key];
    }

    return null;
  }
}

module.exports = { Storage };
