const MTProto = require('../main');
const { getSRPParams } = require('../utils');

const mtproto = new MTProto({
  api_id: process.env.API_ID,
  api_hash: process.env.API_HASH,
  test: true,
});

window.mtproto = mtproto;

// Ali: +9996621111 -> @test9996621111
// Pavel: +9996622222 -> @test9996622222
// Ivan: +9996627777 -> @test9996627777

const formCode = document.getElementById('form-code');
const formPhone = document.getElementById('form-phone');
const getFullUser = document.getElementById('getFullUser');
const getNearestDc = document.getElementById('getNearestDc');
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

  mtproto
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

  mtproto
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
  console.log(`password:`, password);

  mtproto
    .call('account.getPassword')
    .then(async result => {
      const { srp_id, current_algo, secure_random, srp_B } = result;
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
});

servers.forEach(button => {
  button.addEventListener('click', () => {
    const { id } = button.dataset;

    console.log(`id:`, id);
    mtproto.changeDc(id);
  });
});

getNearestDc.addEventListener('click', () => {
  mtproto.call('help.getNearestDc').then(result => {
    console.log(`help.getNearestDc[result]:`, result);
  });
});

getFullUser.addEventListener('click', () => {
  mtproto
    .call('users.getFullUser', {
      id: {
        _: 'inputUserSelf',
      },
    })
    .then(result => {
      console.log(`users.getFullUser[result]:`, result);
    });
});
