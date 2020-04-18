const { localStorage } = require('./local');

const cache = {};

class Storage {
  constructor(prefix) {
    this._prefix = prefix;
  }

  setPrefix(prefix) {
    this._prefix = prefix;
  }

  // Set with prefix
  pSet(name, value) {
    const key = `${this._prefix}${name}`;
    cache[key] = value;

    localStorage[key] = JSON.stringify(value);
  }

  pGetBytes(name) {
    return new Uint8Array(this.pGet(name));
  }

  // Get with prefix
  pGet(name) {
    const key = `${this._prefix}${name}`;

    if (key in this) {
      return cache[key];
    }

    if (key in localStorage) {
      cache[key] = JSON.parse(localStorage[key]);

      return cache[key];
    }

    return null;
  }

  set(key, value) {
    cache[key] = value;

    localStorage[key] = JSON.stringify(value);
  }

  get(key) {
    if (key in this) {
      return cache[key];
    }

    if (key in localStorage) {
      cache[key] = JSON.parse(localStorage[key]);

      return cache[key];
    }

    return null;
  }
}

module.exports = Storage;
