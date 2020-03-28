# @mtproto/core

[![NPM](https://img.shields.io/npm/v/@mtproto/core.svg?style=flat-square)](https://www.npmjs.com/package/@mtproto/core)
[![Travis](https://img.shields.io/travis/com/alik0211/mtproto-core/master.svg?style=flat-square)](https://travis-ci.com/alik0211/mtproto-core)

> Telegram API (MTProto) client library for browser

* **Actual.** 108 layer in the API scheme
* **Fast.** Uses WebSocket to work with the network
* **Easy.** Cryptography is hidden. Just make requests to the API
* **Events.** Subscribe to updates via the EventEmitter API
* **2FA.** Use the library's built-in function to calculate 2FA parameters

## Install
### Module
```sh
yarn add @mtproto/core -E
# or
npm i @mtproto/core -E
```

### Browser

```html
<script src="https://cdn.jsdelivr.net/npm/@mtproto/core@1.2.0/dist/mtproto.min.js"></script>
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

// 2. Get the user country code
mtproto.call('help.getNearestDc').then(result => {
  console.log(`country:`, result.country);
});
```

## Login
```js
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
          // https://github.com/alik0211/mtproto-core#2fa-two-factor-authentication
        }
      });
  });
```

## 2FA (Two-factor authentication)

```js
const { getSRPParams } = require('@mtproto/core');

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

## API

### `mtproto.call(method, options) => Promise`
Select method and options from [methods list](https://core.telegram.org/methods). `Promise.then` contain result. `Promise.catch` contain error with the `error_code` and `error_message` properties.

Example:
```js
mtproto.call('help.getNearestDc').then(result => {
  console.log(`result:`, result);
}).catch(error => {
  console.log(`error:`, error);
});
```

### `mtproto.updates.on(UpdatesName, handler)`
Authorized users are being [Updates](https://core.telegram.org/type/Updates). They can be handled using `mtproto.updates.on`. Example of handling a [updateShort](https://core.telegram.org/constructor/updateShort) with [updateUserStatus](https://core.telegram.org/constructor/updateUserStatus):
```js
mtproto.updates.on('updateShort', message => {
  const { update } = message;

  if (update._ === 'updateUserStatus') {
    const { user_id, status } = update;

    console.log(`User with id ${user_id} change status to ${status}`);
  }
});
```

### `MTProto.getSRPParams({ g, p, salt1, salt2, gB, password }) => { A, M1 }`

For more information about parameters, see the [article on the Telegram website](https://core.telegram.org/api/srp).

Example in [2FA (Two-factor authentication)](https://github.com/alik0211/mtproto-core#2fa-two-factor-authentication)

## Useful references

- API methods — https://core.telegram.org/methods
- API schema — https://core.telegram.org/schema
