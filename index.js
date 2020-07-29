const { MTProto } = require('./src');
const { getSRPParams } = require('./src/utils/crypto');
const { getSchema } = require('./src/tl/schema');

module.exports = { MTProto, getSRPParams, getSchema };
