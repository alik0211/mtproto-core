const {
  mtproto,
  getNearestDc,
  sendCode,
  signIn,
  checkPassword,
  getFullUser,
  getConfig,
} = require('./common');

const phone = '+9996627777';
const password = 'test';

sendCode(phone)
  .catch(error => {
    console.log(`sendCode[error]:`, error);

    if (error.error_message.includes('_MIGRATE_')) {
      const [type, nextDcId] = error.error_message.split('_MIGRATE_');

      mtproto.setDefaultDc(+nextDcId);

      return sendCode(phone);
    }
  })
  .then(() => signIn('22222'))
  .catch(error => {
    console.log(`signIn[error]:`, error);

    if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
      return checkPassword(password);
    }
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
