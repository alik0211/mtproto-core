const {
  getNearestDc,
  sendCode,
  signIn,
  checkPassword,
  getFullUser,
} = require('./common');

sendCode('+9996627777')
  .then(() => {
    return signIn('22222').catch(error => {
      if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
        console.log(`Need password!`);
      }
    });
  })
  .then(() => {
    return checkPassword('test');
  })
  .then(result => {
    console.log(`checkPassword[result]:`, result);
    return getNearestDc({ dcId: 1 });
  })
  .then(result => {
    console.log(`getNearestDc[result]:`, result);
  })
  .catch(error => {
    console.log(`error:`, error);
  });
