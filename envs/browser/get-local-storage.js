function getLocalStorage() {
  return {
    set(key, value) {
      return window.localStorage.setItem(key, value);
    },

    get(key) {
      return window.localStorage.getItem(key);
    },
  };
}

module.exports = getLocalStorage;
