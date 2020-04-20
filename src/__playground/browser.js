const {
  sendCode,
  signIn,
  checkPassword,
  getFullUser,
  getNearestDc,
  getConfig,
  handleUpdates,
} = require('./common');

const formCode = document.getElementById('form-code');
const formPhone = document.getElementById('form-phone');
const getFullUserButton = document.getElementById('getFullUser');
const getNearestDcButton = document.getElementById('getNearestDc');
const formPassword = document.getElementById('form-password');

formPhone.addEventListener('submit', event => {
  event.preventDefault();

  sendCode(formPhone.elements.phone.value);
});

formCode.addEventListener('submit', event => {
  event.preventDefault();

  signIn(formCode.elements.code.value);
});

formPassword.addEventListener('submit', event => {
  event.preventDefault();

  checkPassword(formPassword.elements.password.value);
});

getNearestDcButton.addEventListener('click', () => {
  getNearestDc();
});

getFullUserButton.addEventListener('click', () => {
  getFullUser().then(result => {
    console.log(`getFullUser[result]:`, result);
  });
});
