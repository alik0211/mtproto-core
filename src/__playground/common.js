const { MTProto, getSRPParams } = require('../../');

const mtproto = new MTProto({
  api_id: process.env.API_ID,
  api_hash: process.env.API_HASH,

  test: true,
});

// Ali: +9996621111 -> @test9996621111
// Pavel: +9996622222 -> @test9996622222
// Ivan: +9996627777 -> @test9996627777

const state = {
  phone: null,
  phoneCodeHash: null,
  code: null,
  password: null,
};

function sendCode(phone) {
  console.log(`phone:`, phone);

  state.phone = phone;

  mtproto
    .call('auth.sendCode', {
      phone_number: state.phone,
      settings: {
        _: 'codeSettings',
      },
    })
    .then(result => {
      console.log(`result.phone_code_hash:`, result.phone_code_hash);
      state.phoneCodeHash = result.phone_code_hash;
    })
    .catch(error => {
      // error.error_message === 'PHONE_MIGRATE_2'

      if (error.error_message.includes('_MIGRATE_')) {
        const [item, dcId] = error.error_message.split('_MIGRATE_');

        mtproto.changeDc(dcId);

        // Repeat call this
      }
    });
}

function signIn(code) {
  state.code = code;

  mtproto
    .call('auth.signIn', {
      phone_code: state.code,
      phone_number: state.phone,
      phone_code_hash: state.phoneCodeHash,
    })
    .then(result => {
      console.log(`auth.signIn[result]:`, result);
    })
    .catch(error => {
      if (error.error_message === 'SESSION_PASSWORD_NEEDED') {
        console.log(`Need password!`);
      }
    });
}

function checkPassword(password) {
  state.password = password;

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
}

function getFullUser() {
  mtproto
    .call('users.getFullUser', {
      id: {
        _: 'inputUserSelf',
      },
    })
    .then(response => {
      console.log(`response:`, response);
    })
    .catch(error => {
      console.log(`error:`, error);
    });
}

function handleUpdates() {
  // updatesTooLong
  // updateShortMessage
  // updateShortChatMessage
  // updateShort
  // updates
  // updateShortSentMessage

  mtproto.updates.on('updateShort', message => {
    console.log(`message:`, message);
  });
}

function getNearestDc() {
  mtproto.call('help.getNearestDc').then(result => {
    console.log(`help.getNearestDc[result]:`, result);
  });
}

module.exports = {
  sendCode,
  signIn,
  checkPassword,
  getFullUser,
  getNearestDc,
  handleUpdates,
};
