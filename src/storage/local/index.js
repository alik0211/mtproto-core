const Configstore = require('configstore');
const baseDebug = require('../../utils/common/base-debug');

const debug = baseDebug.extend('storage');

function getLocalStorage(options) {
  // @TODO: Add check options.path

  const localStorage = new Configstore(
    '@mtproto/core',
    {},
    {
      configPath: options.path,
    }
  );

  debug(`session located in ${localStorage.path}`);

  return localStorage;
}

module.exports = { getLocalStorage };
