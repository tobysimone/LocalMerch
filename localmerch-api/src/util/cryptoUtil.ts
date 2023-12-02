import * as crypto from 'crypto';
import { ApiKeys } from '../infrastructure/authentication/ApiKeys';

export function generateKeyPair(): ApiKeys {
    const secretKey = crypto.randomBytes(64).toString('base64url');
    const publicKey = crypto.randomBytes(64).toString('base64url');

    return ({
        publicKey,
        secretKey
    });
}