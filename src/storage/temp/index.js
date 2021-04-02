class TempLocalStorage {
  constructor() {
    this.storage = new Map();
  }

  set(key, value) {
    return this.storage.set(key, value);
  }

  get(key) {
    return this.storage.get(key);
  }
}

const tempLocalStorage = new TempLocalStorage();

module.exports = tempLocalStorage;
