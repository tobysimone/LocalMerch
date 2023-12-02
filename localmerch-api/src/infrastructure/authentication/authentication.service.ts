import { InsertUserKey, Query, UserKey } from "../../@types/database.types";
import { generateKeyPair } from "../../util/cryptoUtil";
import { DataProvider } from "../data/DataProvider.infrastructure";
import { ApiKeys } from "./ApiKeys";

export class AuthenticationService {

    constructor(private dp: DataProvider) {}

    async getApiKeysFromPublicKey(publicKey: string): Promise<UserKey | null> {
        const { data, error } = await this.dp.getByEqQuery<UserKey>('user_key', 'public_key', publicKey);
        return data;
    }
    
    async updateUserApiKeys(userId: number, apiKeys: ApiKeys): Promise<UserKey | null> {
        const userKey: InsertUserKey = {
            user_id: String(userId),
            public_key: apiKeys.publicKey,
            secret_key: apiKeys.secretKey
        }
        this.dp.insert('user_key', userKey);

        return await this.getApiKeysFromPublicKey(apiKeys.publicKey);
    }

    generateApiKeys(): ApiKeys {
        return generateKeyPair();
    }
}