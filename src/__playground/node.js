const readline = require('readline');
const api = require('./api');
const { getSRPParams } = require('../../');
const {
  getUser,
  sendCode,
  signIn,
  getPassword,
  checkPassword,
} = require('./auth');

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

(async () => {
  const user = await getUser();

  if (!user) {
    const phone = await prompt('phone: ');

    const { phone_code_hash } = await sendCode(phone);

    try {
      const code = await prompt('code: ');

      const authResult = await signIn({
        code,
        phone,
        phone_code_hash,
      });

      console.log(`authResult:`, authResult);
    } catch (error) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        console.log(`error:`, error);

        return;
      }

      // 2FA

      const password = await prompt('password: ');

      const { srp_id, current_algo, srp_B } = await getPassword();
      const { g, p, salt1, salt2 } = current_algo;

      const { A, M1 } = await getSRPParams({
        g,
        p,
        salt1,
        salt2,
        gB: srp_B,
        password,
      });

      const authResult = await checkPassword({ srp_id, A, M1 });

      console.log(`authResult:`, authResult);
    }
  }

  // const result = await api.call('account.getAccountTTL');

  // const result = await api.call('help.getConfig');

  // const result = await api.call('users.getUsers', {
  //   id: [
  //     {
  //       _: 'inputUserSelf',
  //     },
  //   ],
  // });

  // console.log(`result:`, result);
})();
