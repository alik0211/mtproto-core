const envPaths = require('env-paths');
const { LocalStorage } = require('node-localstorage');

const paths = envPaths('@mtproto/core', {
  suffix: '',
});

console.log(`Auth data is located in ${paths.data}`);

const localStorage = new LocalStorage(paths.data);

module.exports = { localStorage };
