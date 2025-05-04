import * as crypto from 'crypto';

export function generateCryptoToken(length: number = 64): string {
  if (length % 2 !== 0) {
    throw new Error('Token length must be an even number for hexadecimal representation.');
  }
  const numBytes = length / 2;
  const token = crypto.randomBytes(numBytes).toString('hex');
  return token;
}
// const randomToken64 = generateCryptoToken(64);
// console.log(`Generated 64-character token: ${randomToken64}`);
