const readline = require('readline');
const { getSRPParams } = require('../../');
const { sendCode, signIn, getPassword, checkPassword } = require('./auth');

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
  const phone = await prompt('phone: ');

  const authResult = await sendCode(phone).then(async sendCodeResult => {
    const code = await prompt('code: ');
    return signIn({
      code,
      phone,
      phone_code_hash: sendCodeResult.phone_code_hash,
    }).catch(async error => {
      if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
        const password = await prompt('password: ');
        return getPassword().then(async result => {
          const { srp_id, current_algo, srp_B } = result;
          const { g, p, salt1, salt2 } = current_algo;
          const { A, M1 } = await getSRPParams({
            g,
            p,
            salt1,
            salt2,
            gB: srp_B,
            password,
          });
          return checkPassword({ srp_id, A, M1 });
        });
      }
      return Promise.reject(error);
    });
  });

  console.log(`authResult:`, authResult);
})();
