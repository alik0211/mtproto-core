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
  .call('auth.sendCode', {
    flags: 0,
    phone_number: phoneNumber,
  })
  .then(result => {
    // console.log('auth.sendCode[result]:', result);
    return mtproto.api.call('auth.signIn', {
      phone_code: '22222',
      phone_number: phoneNumber,
      phone_code_hash: result.phone_code_hash,
    });
  })
  .then(result => {
    // console.log('auth.signIn[result]:', result);
    const { user } = result;
    console.log('user:', user);
    // let offsetDate = Math.round(new Date().getTime() / 1000);
    // return mtproto.api.call('messages.getDialogs', {
    //   flags: 0,
    //   offset_date: offsetDate,
    //   offset_peer: { _: 'inputPeerEmpty' },
    //   limit: 20,
    // });
  });
// .then(dialogs => {
//   console.log('messages.getDialogs[dialogs]:', dialogs);
// });
