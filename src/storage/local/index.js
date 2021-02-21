const Configstore = require('configstore');

function getLocalStorage(options) {
  // @TODO: Add check options.path

  const localStorage = new Configstore(
    '@mtproto/core',
    {},
    {
      configPath: options.path,
    }
  );

  console.log(`Session located in ${localStorage.path}`);

  return localStorage;
}

module.exports = { getLocalStorage };
