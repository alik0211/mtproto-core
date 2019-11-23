const API = require('./main');

API.call('help.getNearestDc')
  .then(result => {
    console.log('help.getNearestDc[result]:', result);
    return API.call('auth.sendCode', {
      flags: 0,
      // lang_code: 'en',
      phone_number: '+9996621488',
    });
  })
  .then(result => {
    console.log('auth.sendCode[result]:', result);
    return API.call('auth.signIn', {
      phone_code: '22222',
      phone_number: '+9996621488',
      phone_code_hash: result.phone_code_hash,
    });
  })
  .then(result => {
    console.log('auth.signIn[result]:', result);
    const { user } = result;
    console.log('user:', user);
  });
