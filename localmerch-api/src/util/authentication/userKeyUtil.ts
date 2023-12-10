import { UserKey } from "../../@types/database/database.types";

export function validateUserKey(userKey: UserKey | null) {
    return userKey !== null &&
        userKey.user_id &&
        userKey.secret_key &&
        userKey.role &&
        userKey.public_key &&
        userKey.secret_key;
}