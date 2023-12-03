import { UserKeyRole } from "../authentication/UserKeyRole.type";

export type RouteConfig = {
    route: string;
    method: 'get' | 'post' | 'put' | 'delete';
    apiKeyRole: UserKeyRole;
}