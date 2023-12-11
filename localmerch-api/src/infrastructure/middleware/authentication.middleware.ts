import { error } from 'console';
import crypto from 'crypto';
import { UserKeyRole } from '../../@types/authentication/UserKeyRole.type';
import { UserKey } from "../../@types/database/database.types";
import { RouteConfig } from '../../@types/server/RouteConfig.type';
import { getRouteConfig, routeConfigs } from '../../config/routes/route.config';
import { validateUserKey } from '../../util/authentication/userKeyUtil';
import { AuthenticationService } from "../authentication/authentication.service";
import { warn } from '../logging/logger.infrastructure';
import { Supabase } from "../supabase/supabase.infrastructure";

const authenticationService = new AuthenticationService(Supabase);

export async function authenticationMiddleware(request: any, response: any, next: any) {
    const publicKey = getPublicKeyFromRequest(request);
    if(!publicKey) {
        warn(`No public key provided`);
        sendUnauthorizedResponse(response);
        return;
    }

    const getUserKey = await getUserKeyFromPublicKey(publicKey);
    if(!getUserKey || !getUserKey?.userKey || !validateUserKey(getUserKey?.userKey)) {
        warn(`No user key found for public key ${publicKey}`);
        sendUnauthorizedResponse(response);
        return;
    }

    const { secret_key: secretKey, role: userKeyRole } = getUserKey?.userKey;

    const signature = request.headers['signature'];
    const formattedRequestBody = getFormattedRequestBody(JSON.stringify(request.body));
    const isSignatureValid = verifyRequestSignature(secretKey, signature, formattedRequestBody);
    if(!isSignatureValid) {
        error(`Invalid signature provided`);
        sendUnauthorizedResponse(response);
        return;
    }

    const role = userKeyRole.toLowerCase() as UserKeyRole;
    const routeConfig = getRouteConfig(request.url, request.method, routeConfigs);
    if(!routeConfig || !canAccessRoute(routeConfig, role)) {
        error(`User with role ${role} is not allowed to access route ${routeConfig?.route}`);
        sendUnauthorizedResponse(response);
        return;
    }

    request.userId = getUserKey?.userKey?.user_id;

    next();
}

function canAccessRoute(routeConfig: RouteConfig, role: UserKeyRole) {
    switch(routeConfig.apiKeyRole.toLowerCase()) {
        case 'admin':
            return role === 'admin';
        case 'shop':
            return role === 'admin' || role === 'shop';
        case 'user':
            return role === 'admin' || role === 'shop' || role === 'user';
        default:
            return false;
    }
}

function verifyRequestSignature(secretKey: string, signature: string, message: string): boolean {
    if(!secretKey || !signature || !message) {
        error(`Invalid signature provided. Secret: ${secretKey}, Signature: ${signature}, Message: ${JSON.stringify(message)}`);
        return false;
    }

    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(message);
    const computedSignature = hmac.digest('hex');

    return signature.length === computedSignature.length && 
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));
}

async function getUserKeyFromPublicKey(publicKey: string): Promise<{ userKey: UserKey | null, error: Error | null }> {
    return await authenticationService.getUserKey(publicKey);
}

function getPublicKeyFromRequest(request: any) {
    return request.headers['public_key'];
}

function sendUnauthorizedResponse(response: any) {
    response.sendStatus(401);
}

function getFormattedRequestBody(body: any) {
    return body.replace(/\s/g, '');
}