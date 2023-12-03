import { UserKeyRole } from "../../@types/authentication/UserKeyRole.type";

export function getUserKeyRoleFromString(role: string): UserKeyRole | null {
    switch(role) {
        case 'admin':
            return UserKeyRole.ADMIN as UserKeyRole;
        case 'user':
            return UserKeyRole.USER as UserKeyRole;
        default:
            return null;
    }
}