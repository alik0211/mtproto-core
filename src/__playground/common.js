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

function sendCode(phone, options) {
  console.log(`phone:`, phone);

  state.phone = phone;

  return mtproto
    .call(
      'auth.sendCode',
      {
        phone_number: state.phone,
        settings: {
          _: 'codeSettings',
        },
      },
      options
    )
    .then(result => {
      console.log(`result.phone_code_hash:`, result.phone_code_hash);
      state.phoneCodeHash = result.phone_code_hash;
      return result;
    });
}

function signIn(code, options) {
  state.code = code;

  return mtproto.call(
    'auth.signIn',
    {
      phone_code: state.code,
      phone_number: state.phone,
      phone_code_hash: state.phoneCodeHash,
    },
    options
  );
}

function checkPassword(password, options) {
  state.password = password;

  return mtproto.call('account.getPassword', {}, options).then(async result => {
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

    return mtproto.call(
      'auth.checkPassword',
      {
        password: {
          _: 'inputCheckPasswordSRP',
          srp_id,
          A,
          M1,
        },
      },
      options
    );
  });
}

function getFullUser(options) {
  return mtproto.call(
    'users.getFullUser',
    {
      id: {
        _: 'inputUserSelf',
      },
    },
    options
  );
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

function getNearestDc(options) {
  return mtproto.call('help.getNearestDc', {}, options);
}

function getConfig() {
  return mtproto.call('help.getConfig');
}

module.exports = {
  mtproto,
  sendCode,
  signIn,
  checkPassword,
  getFullUser,
  getNearestDc,
  getConfig,
  handleUpdates,
};
