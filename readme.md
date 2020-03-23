# @mtproto/core

[![NPM](https://img.shields.io/npm/v/@mtproto/core.svg?style=flat-square)](https://www.npmjs.com/package/@mtproto/core)
[![Travis](https://img.shields.io/travis/com/alik0211/mtproto-core/master.svg?style=flat-square)](https://travis-ci.com/alik0211/mtproto-core)

> Telegram API (MTProto) client library for browser

* **Actual.** 108 layer in the API scheme
* **Fast.** Uses WebSocket to work with the network
* **Easy.** Cryptography is hidden. Just make requests to the API
* **2FA.** Use the library's built-in function to calculate 2FA parameters

## Install

```
yarn add @mtproto/core -E
```

## Quick start

You need **api_id** and **api_hash**. If you do not have them yet, then get them according to the official instructions: [creating your Telegram application](https://core.telegram.org/api/obtaining_api_id).

```js
const MTProto = require('@mtproto/core');

const api_id = 'YOU_API_ID';
const api_hash = 'YOU_API_HASH';

// 1. Create an instance
const mtproto = new MTProto({
  api_id,
  api_hash,

  // Use test servers
  test: true,
});

// 2. Log in using phone number
// https://core.telegram.org/api/auth#test-phone-numbers
const phone = '+9996621111';
const code = '22222';

mtproto
  .call('auth.sendCode', {
    phone_number: phone,
    settings: {
      _: 'codeSettings',
    },
  })
  .then(result => {
    mtproto
      .call('auth.signIn', {
        phone_code: code,
        phone_number: phone,
        phone_code_hash: result.phone_code_hash,
      })
      .then(result => {
        console.log(`auth.signIn[result]:`, result);
      })
      .catch(error => {
        if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
          // Need use 2FA
        }
      });
  });
```

## 2FA (Two-factor authentication)

```js
const { getSRPParams } = require('@mtproto/core/src/utils/crypto');

const password = 'YOU_PASSWORD';

mtproto
  .call('account.getPassword')
  .then(async result => {
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
  })
  .then(result => {
    console.log(`auth.checkPassword[result]:`, result);
  });
```
