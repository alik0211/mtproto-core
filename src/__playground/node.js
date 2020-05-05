const readline = require('readline');
const {
  mtproto,
  getNearestDc,
  sendCode,
  signIn,
  checkPassword,
  getFullUser,
  getConfig,
} = require('./common');

function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve, reject) => {
    rl.question(question, input => {
      rl.close();

      resolve(input);
    });
  });
}

const phone = '+9996627777';
const password = 'test';

// getFullUser()
//   .then(result => {
//     console.log(`result:`, result);
//     process.exit();
//   })
//   .catch(error => {
//     console.log(`error:`, error);
//     process.exit();
//   });

sendCode(phone)
  .catch(error => {
    console.log(`sendCode[error]:`, error);

    if (error.error_message.includes('_MIGRATE_')) {
      const [type, nextDcId] = error.error_message.split('_MIGRATE_');

      mtproto.setDefaultDc(+nextDcId);

      return sendCode(phone);
    }
  })
  .then(async () => {
    const code = await prompt('code: ');

    return signIn(code);
  })
  .catch(error => {
    console.log(`signIn[error]:`, error);

    if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
      return checkPassword(password);
    }
  })
  .then(result => {
    console.log(`signIn/checkPassword[result]:`, result);

    return getNearestDc({ dcId: 1 });
  })
  .then(result => {
    console.log(`getNearestDc[result]:`, result);

    process.exit();
  })
  .catch(error => {
    console.log(`error:`, error);
  });
