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
    this[key] = value;

    localStorage[key] = JSON.stringify(value);
  }

  pGetBytes(name) {
    return new Uint8Array(this.pGet(name));
  }

  // Get with prefix
  pGet(name) {
    const key = `${this._prefix}${name}`;

    if (key in this) {
      return this[key];
    }

    if (key in localStorage) {
      this[key] = JSON.parse(localStorage[key]);

      return this[key];
    }

    return null;
  }

  set(key, value) {
    this[key] = value;

    localStorage[key] = JSON.stringify(value);
  }

  get(key) {
    if (key in this) {
      return this[key];
    }

    if (key in localStorage) {
      this[key] = JSON.parse(localStorage[key]);

      return this[key];
    }

    return null;
  }
}

module.exports = Storage;
