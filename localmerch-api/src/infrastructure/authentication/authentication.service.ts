import { InsertUserKey, UserKey } from "../../@types/database/database.types";
import { generateKeyPair } from "../../util/crypto/cryptoUtil";
import { DataProvider, InsertResult } from "../data/DataProvider.infrastructure";
import { ApiKeys as ApiKey } from "./ApiKeys";

export class AuthenticationService {

    constructor(private dp: DataProvider) {}

    async getUserKey(publicKey: string): Promise<{ userKey: UserKey | null, error: Error | null }> {
        const { data, error } = await this.dp.getByEqQuery<UserKey>('user_key', 'public_key', publicKey);
        return {
            userKey: data || null,
            error
        }
    }
    
    async createUserKey(userId: string, apiKeys: ApiKey): Promise<{ userKey: UserKey | null, error: Error | null }> {
        const userKey: InsertUserKey = {
            user_id: userId,
            public_key: apiKeys.publicKey,
            secret_key: apiKeys.secretKey
        }

        const insertResult: InsertResult<UserKey> = await this.dp.insert('user_key', userKey);

        return await this.getUserKey(apiKeys.publicKey);
    }

    generateUserKey(): ApiKey {
        return generateKeyPair();
    }
}