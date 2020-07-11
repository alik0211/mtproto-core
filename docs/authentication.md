# Authentication

## 0. Init MTProto
```js
const { MTProto } = require('@mtproto/core');

const api_id = 'YOU_API_ID';
const api_hash = 'YOU_API_HASH';

const mtproto = new MTProto({
  api_id,
  api_hash,
});
```

## 1. Send code
```js
function sendCode(phone) {
  return mtproto.call('auth.sendCode', {
    phone_number: phone,
    settings: {
      _: 'codeSettings',
    },
  });
}
```

## 2. Sign in
```js
function signIn({ code, phone, phone_code_hash }) {
  return mtproto.call('auth.signIn', {
    phone_code: code,
    phone_number: phone,
    phone_code_hash: phone_code_hash,
  });
}
```

## 2.1. 2FA
```js
function getPassword() {
  return mtproto.call('account.getPassword');
}

async function checkPassword({ srp_id, A, M1 }) {
  return mtproto.call('auth.checkPassword', {
    password: {
      _: 'inputCheckPasswordSRP',
      srp_id,
      A,
      M1,
    },
  });
}
```

## Code
```js
const { getSRPParams } = require('@mtproto/core');

const phone = 'PHONE_NUMBER';
const code = 'XXXXX';
const password = 'PASSWORD';

sendCode(phone)
  .then(sendCodeResult => {
    return signIn({
      code,
      phone,
      phone_code_hash: sendCodeResult.phone_code_hash,
    }).catch(error => {
      if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
        return getPassword().then(async result => {
          const { srp_id, current_algo, srp_B } = result;
          const { g, p, salt1, salt2, } = current_algo;

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
  }).then(result => {
    console.log('auth.authorization:', result);
  });
```
