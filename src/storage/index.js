const { localStorage } = require('./local');

const cache = {};

class Storage {
  constructor(prefix, options = {}) {
    this._prefix = prefix;

    const { customLocalStorage = localStorage } = options;

    this.localStorage = customLocalStorage;
  }

  setPrefix(prefix) {
    this._prefix = prefix;
  }

  pSet(name, value) {
    const key = `${this._prefix}${name}`;

    this.set(key, value);
  }

  pGetBytes(name) {
    return new Uint8Array(this.pGet(name));
  }

  pGet(name) {
    const key = `${this._prefix}${name}`;

    return this.get(key);
  }

  set(key, value) {
    cache[key] = value;

    this.localStorage.setItem(key, JSON.stringify(value));
  }

  get(key) {
    if (key in cache) {
      return cache[key];
    }

    if (this.localStorage.getItem(key)) {
      cache[key] = JSON.parse(this.localStorage.getItem(key));

      return cache[key];
    }

    return null;
  }
}

module.exports = { Storage };
