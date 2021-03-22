async function PBKDF2(password, salt, iterations) {
  return new Uint8Array(
    await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        hash: 'SHA-512',
        salt,
        iterations,
      },
      await crypto.subtle.importKey(
        'raw',
        password,
        { name: 'PBKDF2' },
        false,
        ['deriveBits']
      ),
      512
    )
  );
}

module.exports = PBKDF2;
