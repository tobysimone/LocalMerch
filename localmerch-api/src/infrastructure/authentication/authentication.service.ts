import { InsertUserKey, UserKey } from "../../@types/database/database.types";
import { generateKeyPair } from "../../util/crypto/cryptoUtil";
import { DataProvider } from "../data/DataProvider.infrastructure";
import { ApiKeys } from "./ApiKeys";

export class AuthenticationService {

    constructor(private dp: DataProvider) {}

    async getApiKeysFromPublicKey(publicKey: string): Promise<UserKey | null> {
        const { data, error } = await this.dp.getByEqQuery<UserKey>('user_key', 'public_key', publicKey);
        if(error) {
            return null;
        }
        
        return data;
    }
    
    async updateUserApiKeys(userId: string, apiKeys: ApiKeys): Promise<UserKey | null> {
        const userKey: InsertUserKey = {
            user_id: userId,
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