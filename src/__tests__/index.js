const MTProto = require('../main');

const mtproto = new MTProto({
  // App credentials
  api_id: process.env.API_ID,
  api_hash: process.env.API_HASH,

  // Use test server
  test: true,

  https: location.protocol === 'https:',
});

// Ali: +9996611111 -> @test9996611111
// Pavel: +9996622222 -> @test9996622222
// Ivan: +9996627777 -> @test9996627777
const phoneNumber = '+9996621111';

// mtproto.api
//   .call('users.getFullUser', {
//     id: {
//       _: 'inputUserSelf',
//     },
//   })
//   .then(result => {
//     console.log(`users.getFullUser[result]:`, result);
//   })
//   .catch(() => {
//     mtproto.api
//       .call('auth.sendCode', {
//         phone_number: phoneNumber,
//         settings: {
//           _: 'codeSettings',
//         },
//       })
//       .then(result => {
//         return mtproto.api.call('auth.signIn', {
//           phone_code: '22222',
//           phone_number: phoneNumber,
//           phone_code_hash: result.phone_code_hash,
//         });
//       })
//       .then(result => {
//         console.log('auth.signIn[result]:', result);
//       });
//   });

// mtproto.api.on('updateShort', message => {
//   console.log(`updateShort[message]:`, message);
// });

const formPhone = document.getElementById('form-phone');
const formCode = document.getElementById('form-code');
const formPassword = document.getElementById('form-password');

let phone = null;
let phoneCodeHash = null;
let code = null;
let password = null;

formPhone.addEventListener('submit', event => {
  event.preventDefault();

  phone = formPhone.elements.phone.value;

  console.log(`phone:`, phone);

  mtproto.api
    .call('auth.sendCode', {
      phone_number: phone,
      settings: {
        _: 'codeSettings',
      },
    })
    .then(result => {
      phoneCodeHash = result.phone_code_hash;
      console.log(`phoneCodeHash:`, phoneCodeHash);
    });
});

formCode.addEventListener('submit', event => {
  event.preventDefault();

  code = formCode.elements.code.value;

  mtproto.api
    .call('auth.signIn', {
      phone_code: code,
      phone_number: phone,
      phone_code_hash: phoneCodeHash,
    })
    .then(result => {
      console.log(`auth.signIn[result]:`, result);
    });
});

formPassword.addEventListener('submit', event => {
  event.preventDefault();

  password = formPassword.elements.password.value;

  console.log(`password:`, password);
});
