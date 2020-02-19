const apiSchema = require('../scheme/api');
const mtprotoSchema = require('../scheme/mtproto');

module.exports = {
  schema: {
    api: apiSchema,
    mtproto: mtprotoSchema,
  },
};
