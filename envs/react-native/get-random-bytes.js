require('react-native-get-random-values');

function getRandomBytes(length) {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

module.exports = getRandomBytes;
