# @mtproto/core

[![NPM](https://img.shields.io/npm/v/@mtproto/core.svg?style=flat-square)](https://www.npmjs.com/package/@mtproto/core)
[![Travis](https://img.shields.io/travis/com/alik0211/mtproto-core/master.svg?style=flat-square)](https://travis-ci.com/alik0211/mtproto-core)
[![Downloads](https://img.shields.io/npm/dm/@mtproto/core?style=flat-square)](https://www.npmjs.com/package/@mtproto/core)
[![Telegram channel](https://img.shields.io/badge/Telegram-channel-blue?style=flat-square&logo=telegram)](https://t.me/mtproto_core)

Telegram API JS (MTProto) client library for browser and nodejs

* **Actual.** 113 layer in the API scheme
* **Fast.** Uses WebSocket for browser and TCP for nodejs
* **Easy.** Cryptography and bytes is hidden. [Just make requests](#mtprotocallmethod-params-options--promise) to the API
* **Smart.** Automatically [sync authorization](#optionssyncauth-boolean) on all DC's
* **Events.** [Subscribe to updates](#mtprotoupdatesonupdates-listener) via the EventEmitter API
* **2FA.** Use the [library's built-in function](#getsrpparams-g-p-salt1-salt2-gb-password----a-m1-) to calculate 2FA parameters

## Install
```sh
yarn add @mtproto/core -E
# or
npm i @mtproto/core -E
```

## Quick start

You need **api_id** and **api_hash**. If you do not have them yet, then get them according to the official instructions: [creating your Telegram application](https://core.telegram.org/api/obtaining_api_id).

```js
const { MTProto } = require('@mtproto/core');

const api_id = 'YOU_API_ID';
const api_hash = 'YOU_API_HASH';

// 1. Create an instance
const mtproto = new MTProto({
  api_id,
  api_hash,
});

// 2. Get the user country code
mtproto.call('help.getNearestDc').then(result => {
  console.log(`country:`, result.country);
});
```

## Guides

- [Authentication](docs/authentication.md)
- [Handling common errors](docs/handling-common-errors.md)

## API

### `new MTProto({ api_id, api_hash, test, customLocalStorage }) => mtproto`

#### `api_id: number` and `api_hash: string`
**api_id** and **api_hash** are required. If you do not have them yet, then get them according to the official instructions: [creating your Telegram application](https://core.telegram.org/api/obtaining_api_id).

#### `test: boolean`
Default: `false`. Use test data centers. On test servers, you can use [test phone numbers](https://core.telegram.org/api/auth#test-phone-numbers).

#### `customLocalStorage: localStorage`
Default for browser: `window.localStorage`. Default for nodejs: [`node-localstorage`](https://github.com/alik0211/mtproto-core/blob/master/src/storage/local/index.js). Custom storage for save auth data. Your localStorage must follow this API:
```ts
class MyAsyncLocalStorage {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string|null>;
}
```

We have ready-made storage:
1. [tempLocalStorage](https://github.com/alik0211/mtproto-core/blob/master/src/storage/temp/index.js) only stores data while the script is running

Example:
```js
const { tempLocalStorage } = require('@mtproto/core/src/storage/temp');

const mtproto = new MTProto({
  customLocalStorage: tempLocalStorage,
});
```

### `mtproto.call(method, params, options) => Promise`

#### `method: string`
Method name from [methods list](https://core.telegram.org/methods).

#### `params: object`
Parameters for `method` from `https://core.telegram.org/method/{method}#parameters`.

If you need to pass a constructor use `_`. Example for [users.getFullUser](https://core.telegram.org/method/users.getFullUser#parameters):
```js
const params = {
  id: {
    _: 'inputUserSelf',
  },
};
```

#### `options.dcId: number`
Specific DC id. By default, it is `2`. You can change the default value using [mtproto.setDefaultDc](#mtprotosetdefaultdcdcid) method.

#### `options.syncAuth: boolean`
Default: `true`. Copy authorization to all DC if the response contains `auth.authorization`.

#### Example:
```js
mtproto.call('help.getNearestDc', {}, {
  dcId: 1
}).then(result => {
  console.log('result:', result);
  // { _: 'nearestDc', country: 'RU', this_dc: 1, nearest_dc: 2 }
}).catch(error => {
  console.log('error.error_code:', error.error_code);
  console.log('error.error_message:', error.error_message);
});
```

### `mtproto.updates.on(updates, listener)`
Method for handles [updates](https://core.telegram.org/type/Updates).

Example of handling a [updateShort](https://core.telegram.org/constructor/updateShort) with [updateUserStatus](https://core.telegram.org/constructor/updateUserStatus):
```js
mtproto.updates.on('updateShort', message => {
  const { update } = message;

  if (update._ === 'updateUserStatus') {
    const { user_id, status } = update;

    console.log(`User with id ${user_id} change status to ${status}`);
  }
});
```

### `mtproto.setDefaultDc(dcId) => Promise`
If a [migration error](https://core.telegram.org/api/errors#303-see-other) occurs, you can use this function to change the default [data center](https://core.telegram.org/api/datacenter). You can also use [options.dcId](#optionsdcid-number).

See the example in the [authentication](docs/authentication.md).

### `getSRPParams({ g, p, salt1, salt2, gB, password }) => { A, M1 }`

Function to calculate parameters for 2FA (Two-factor authentication). For more information about parameters, see the [article on the Telegram website](https://core.telegram.org/api/srp).

See the example in the [authentication](docs/authentication.md).

## Useful references

- API methods — https://core.telegram.org/methods
- API schema — https://core.telegram.org/schema
