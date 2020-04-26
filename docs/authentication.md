# Authentication

```js
const { MTProto, getSRPParams } = require('@mtproto/core');

const mtproto = new MTProto({
  api_id: 'YOU_API_ID',
  api_hash: 'YOU_API_HASH',

  test: true,
});

const phone = '+99966XYYYY';
const code = 'XXXXX';
const password = 'PASSWORD';

function sendCode(phone) {
  return mtproto.call('auth.sendCode', {
    phone_number: phone,
    settings: {
      _: 'codeSettings',
    },
  });
}

sendCode(phone)
  .catch(error => {
    if (error.error_message.includes('_MIGRATE_')) {
      const [type, nextDcId] = error.error_message.split('_MIGRATE_');

      mtproto.setDefaultDc(+nextDcId);

      return sendCode(phone);
    }
  })
  .then(result => {
    return mtproto.call('auth.signIn', {
      phone_code: code,
      phone_number: phone,
      phone_code_hash: result.phone_code_hash,
    });
  })
  .catch(error => {
    if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
      return mtproto.call('account.getPassword').then(async result => {
        const { srp_id, current_algo, srp_B } = result;
        const { salt1, salt2, g, p } = current_algo;

        const { A, M1 } = await getSRPParams({
          g,
          p,
          salt1,
          salt2,
          gB: srp_B,
          password,
        });

        return mtproto.call('auth.checkPassword', {
          password: {
            _: 'inputCheckPasswordSRP',
            srp_id,
            A,
            M1,
          },
        });
      });
    }
  })
  .then(result => {
    console.log('auth.authorization:', result);
  });
```