const { AsyncStorage } = require('react-native');

function getLocalStorage() {
  return {
    set: AsyncStorage.setItem,
    get: AsyncStorage.getItem
  }
}

module.exports = getLocalStorage;
