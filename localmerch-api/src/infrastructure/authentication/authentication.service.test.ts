import { MockAuthenticationServiceDataProvider } from "../supabase/__mocks__/supabase.infrastructure.mock";
import { AuthenticationService } from "./authentication.service";

describe('AuthenticationService', () => {
    let authenticationService: AuthenticationService;

    beforeEach(() => {
        authenticationService = new AuthenticationService(new MockAuthenticationServiceDataProvider());
    });

    it('authentication service is defined', () => {
        expect(authenticationService).toBeDefined();
    });

    it('authentication service has a generateApiKeys method', () => {
        expect(authenticationService.generateApiKeys).toBeDefined();
    });

    it('authentication service generateApiKeys method returns an object with two strings', () => {
        const apiKeys = authenticationService.generateApiKeys();
        expect(typeof apiKeys).toEqual('object');
    });

    it('authentication service generateApiKeys method returns object with two strings of length 84', () => {
        const apiKeys = authenticationService.generateApiKeys();
        expect(apiKeys.publicKey.length).toEqual(86);
        expect(apiKeys.secretKey.length).toEqual(86);
    });

    it('authentication service has an updateUserApiKeys method', () => {
        expect(authenticationService.updateUserApiKeys).toBeDefined();
    });

    it('authentication service has an updateUserApiKeys method that takes userId and ApiKeys as a parameter', () => {
        const userId = 1;
        expect(authenticationService.updateUserApiKeys(userId, { publicKey: '', secretKey: '' })).toBeDefined();
    });

    it('authentication service updateUserApiKeys method returns ApiKeys objects', async () => {
        const userId = 1;
        const apiKeys = await authenticationService.updateUserApiKeys(userId, authenticationService.generateApiKeys());
        expect(apiKeys).toBeDefined();
        expect(apiKeys?.public_key).toBeDefined();
        expect(apiKeys?.secret_key).toBeDefined();
    });

    it('authentication service updateUserApiKeys method returns ApiKeys objects with two strings of length 84', async () => {
        const userId = 1;
        const apiKeys = await authenticationService.updateUserApiKeys(userId, authenticationService.generateApiKeys());
        expect(apiKeys?.public_key.length).toEqual(86);
        expect(apiKeys?.secret_key.length).toEqual(86);
    });

    it('authentication service has a getApiKeysFromPublicKey method', () => {
        expect(authenticationService.getApiKeysFromPublicKey).toBeDefined();
    });

    it('authentication service getApiKeysFromPublicKey method returns null if no ApiKeys exist', async () => {
        const apiKeys = await authenticationService.getApiKeysFromPublicKey('');
        expect(apiKeys).toBeUndefined();
    });

    it('authentication service getApiKeysFromPublicKey method returns ApiKeys object if ApiKeys exist', async () => {
        const userId = 1;
        const apiKeys = await authenticationService.updateUserApiKeys(userId, authenticationService.generateApiKeys());
        const userKey = await authenticationService.getApiKeysFromPublicKey(apiKeys?.public_key ?? '');
        expect(userKey).toBeDefined();
        expect(userKey?.public_key).toBeDefined();
        expect(userKey?.secret_key).toBeDefined();
        expect(userKey?.public_key.length).toEqual(86);
        expect(userKey?.secret_key.length).toEqual(86);
    });
});