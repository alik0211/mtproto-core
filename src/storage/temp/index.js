class TempLocalStorage {
  constructor() {
    this.storage = new Map();
  }

  setItem(key, value) {
    return this.storage.set(key, value);
  }

  getItem(key) {
    return this.storage.get(key);
  }
}

const tempLocalStorage = new TempLocalStorage();

module.exports = {
  tempLocalStorage,
};
