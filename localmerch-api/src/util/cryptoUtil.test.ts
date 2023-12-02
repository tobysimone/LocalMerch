import { generateKeyPair } from './cryptoUtil';

describe('generateKeyPair', () => {
  it('should generate a secret key and a public key', () => {
    const { secretKey, publicKey } = generateKeyPair();

    expect(secretKey).toBeDefined();
    expect(publicKey).toBeDefined();
  });

  it('should generate unique secret keys', () => {
    const keyPair1 = generateKeyPair();
    const keyPair2 = generateKeyPair();

    expect(keyPair1.secretKey).not.toEqual(keyPair2.secretKey);
  });

  it('should generate unique public keys', () => {
    const keyPair1 = generateKeyPair();
    const keyPair2 = generateKeyPair();

    expect(keyPair1.publicKey).not.toEqual(keyPair2.publicKey);
  });
});