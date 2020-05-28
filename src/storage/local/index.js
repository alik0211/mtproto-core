const envPaths = require('env-paths');
const { LocalStorage } = require('node-localstorage');

const paths = envPaths('@mtproto/core', {
  suffix: '',
});

const localStorage = new LocalStorage(paths.data);

module.exports = { localStorage };
