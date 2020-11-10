# Authentication

## 0. Init Telegram API

Create an Telegram API instance according to the [handling common errors](./handling-common-errors.md) guide. This is **required** to automatically handle migration errors.

## 1. Get information about the current user
```js
async function getUser() {
  try {
    const user = await api.call('users.getFullUser', {
      id: {
        _: 'inputUserSelf',
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}
```

## 2. Send code
```js
function sendCode(phone) {
  return api.call('auth.sendCode', {
    phone_number: phone,
    settings: {
      _: 'codeSettings',
    },
  });
}
```

## 3. Sign in
```js
function signIn({ code, phone, phone_code_hash }) {
  return api.call('auth.signIn', {
    phone_code: code,
    phone_number: phone,
    phone_code_hash: phone_code_hash,
  });
}
```

## 3.1. 2FA
```js
function getPassword() {
  return api.call('account.getPassword');
}

function checkPassword({ srp_id, A, M1 }) {
  return api.call('auth.checkPassword', {
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

(async () => {
  const user = await getUser();

  if (!user) {
    const { phone_code_hash } = await sendCode(phone);

    try {
      const authResult = await signIn({
        code,
        phone,
        phone_code_hash,
      });

      console.log(`authResult:`, authResult);
    } catch (error) {
      if (error.error_message !== 'SESSION_PASSWORD_NEEDED') {
        return;
      }

      // 2FA

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
})();
```
