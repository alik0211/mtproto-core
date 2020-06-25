const envPaths = require('env-paths');
const { LocalStorage } = require('node-localstorage');

let localStorage = null;

function getLocalStorage() {
  if (localStorage) {
    return localStorage;
  }

  const paths = envPaths('@mtproto/core', {
    suffix: '',
  });

  localStorage = new LocalStorage(paths.data);

  console.log(`Auth data is located in ${paths.data}`);

  return localStorage;
}

module.exports = { getLocalStorage };
