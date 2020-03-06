const MTProto = require('../main');
const { TLSerialization } = require('../tl');
const TLSerializer = require('../tl/serializer');

const mtproto = new MTProto({
  // App credentials
  api_id: process.env.API_ID,
  api_hash: process.env.API_HASH,

  // Use test server
  test: true,

  https: location.protocol === 'https:',
});

// Ali: +9996621111 -> @test9996621111
// Pavel: +9996622222 -> @test9996622222
// Ivan: +9996627777 -> @test9996627777
const phoneNumber = '+9996621111';

const formCode = document.getElementById('form-code');
const formPhone = document.getElementById('form-phone');
const getFullUser = document.getElementById('getFullUser');
const formPassword = document.getElementById('form-password');
const servers = document.querySelectorAll('.page__servers .page__server');

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
    })
    .catch(error => {
      if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
        console.log(`Need password!`);
      }
    });
});

formPassword.addEventListener('submit', event => {
  event.preventDefault();

  password = formPassword.elements.password.value;
  // console.log(`password:`, password);

  mtproto.api.checkPassword(password).then(result => {
    console.log(`auth.checkPassword[result]:`, result);
  });
});

servers.forEach(button => {
  button.addEventListener('click', () => {
    const { id } = button.dataset;

    console.log(`id:`, id);
    mtproto.api.setDc(id);
  });
});

getFullUser.addEventListener('click', () => {
  mtproto.api
    .call('users.getFullUser', {
      id: {
        _: 'inputUserSelf',
      },
    })
    .then(result => {
      console.log(`users.getFullUser[result]:`, result);
    });
});
