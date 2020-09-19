const parser = require('./parser');
const builder = require('./builder');
const Serializer = require('./serializer');

const tlParse = deserializer => parser(deserializer);

const tlBuild = params => {
  const serializer = new Serializer();

  builder(serializer, params);

  return serializer;
};

module.exports = { tlParse, tlBuild };
