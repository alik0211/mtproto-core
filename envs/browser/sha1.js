async function SHA1(data) {
  return new Uint8Array(await crypto.subtle.digest('SHA-1', data));
}

module.exports = SHA1;
