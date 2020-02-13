const MTProto = require('../main');

const mtproto = new MTProto({
  // App credentials
  api_id: process.env.API_ID,
  api_hash: process.env.API_HASH,

  // Use test server
  test: true,

  https: location.protocol === 'https:',
});

const phoneNumber = '+9996620000';

mtproto.api
  .call('users.getFullUser', {
    id: {
      _: 'inputUserSelf',
    },
  })
  .then(result => {
    console.log(`users.getFullUser[result]:`, result);
  })
  .catch(() => {
    mtproto.api
      .call('auth.sendCode', {
        flags: 0,
        phone_number: phoneNumber,
      })
      .then(result => {
        return mtproto.api.call('auth.signIn', {
          phone_code: '22222',
          phone_number: phoneNumber,
          phone_code_hash: result.phone_code_hash,
        });
      })
      .then(result => {
        console.log('auth.signIn[result]:', result);
      });
  });
