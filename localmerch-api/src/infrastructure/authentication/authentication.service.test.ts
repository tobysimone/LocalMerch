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
        expect(authenticationService.generateUserKey).toBeDefined();
    });

    it('authentication service generateApiKeys method returns an object with two strings', () => {
        const apiKeys = authenticationService.generateUserKey();
        expect(typeof apiKeys).toEqual('object');
    });

    it('authentication service generateApiKeys method returns object with two strings of length 84', () => {
        const apiKeys = authenticationService.generateUserKey();
        expect(apiKeys.publicKey.length).toEqual(86);
        expect(apiKeys.secretKey.length).toEqual(86);
    });

    it('authentication service has an updateUserApiKeys method', () => {
        expect(authenticationService.createUserKey).toBeDefined();
    });

    it('authentication service has an updateUserApiKeys method that takes userId and ApiKeys as a parameter', () => {
        const userId = '1';
        expect(authenticationService.createUserKey(userId, { publicKey: '', secretKey: '' })).toBeDefined();
    });

    it('authentication service updateUserApiKeys method returns ApiKeys objects', async () => {
        const userId = '1';
        const { userKey: apiKeys, error } = await authenticationService.createUserKey(userId, authenticationService.generateUserKey());
        expect(apiKeys).toBeDefined();
        expect(apiKeys?.public_key).toBeDefined();
        expect(apiKeys?.secret_key).toBeDefined();
    });

    it('authentication service updateUserApiKeys method returns ApiKeys objects with two strings of length 84', async () => {
        const userId = '1';
        const { userKey: apiKeys, error } = await authenticationService.createUserKey(userId, authenticationService.generateUserKey());
        expect(apiKeys?.public_key.length).toEqual(86);
        expect(apiKeys?.secret_key.length).toEqual(86);
    });

    it('authentication service has a getApiKeysFromPublicKey method', () => {
        expect(authenticationService.getUserKey).toBeDefined();
    });

    it('authentication service getApiKeysFromPublicKey method returns null if no ApiKeys exist', async () => {
        const apiKeys = await authenticationService.getUserKey('');
        expect(apiKeys?.userKey).toBeNull();
        expect(apiKeys?.error).toBeDefined();
    });

    it('authentication service getApiKeysFromPublicKey method returns ApiKeys object if ApiKeys exist', async () => {
        const userId = '1';
        const { userKey: apiKeys, error } = await authenticationService.createUserKey(userId, authenticationService.generateUserKey());
        const userKey = await authenticationService.getUserKey(apiKeys?.public_key ?? '');
        expect(userKey).toBeDefined();
        expect(userKey?.userKey?.public_key).toBeDefined();
        expect(userKey?.userKey?.secret_key).toBeDefined();
        expect(userKey?.userKey?.public_key.length).toEqual(86);
        expect(userKey?.userKey?.secret_key.length).toEqual(86);
    });

    it('authentication service getApiKeysFromPublicKey method returns null if ApiKeys do not exist', async () => {
        const userId = '1';
        await authenticationService.createUserKey(userId, authenticationService.generateUserKey());
        const userKey = await authenticationService.getUserKey('');
        expect(userKey?.userKey).toBeNull();
        expect(userKey?.error).toBeDefined();
    });
});