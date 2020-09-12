const builder = require('./builder');
const Serializer = require('./serializer');

const tlBuild = params => {
  const serializer = new Serializer();

  builder(serializer, params);

  return serializer;
};

module.exports = { tlBuild };
