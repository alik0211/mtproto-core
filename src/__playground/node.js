const {
  getNearestDc,
  sendCode,
  signIn,
  checkPassword,
  getFullUser,
  getConfig,
} = require('./common');

getNearestDc()
  .then(result => {
    console.log(`result:`, result);
  })
  .catch(error => {
    console.log(`error:`, error);
  });
