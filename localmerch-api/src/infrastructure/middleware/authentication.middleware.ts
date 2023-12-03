import crypto from 'crypto';
import { UserKeyRole } from '../../@types/authentication/UserKeyRole.type';
import { UserKey } from "../../@types/database/database.types";
import { AuthenticationService } from "../authentication/authentication.service";
import { Supabase } from "../supabase/supabase.infrastructure";
import { RouteConfig } from '../../@types/server/RouteConfig.type';
import { getRouteConfig, routeConfigs } from '../../config/endpoint.config';

const authenticationService = new AuthenticationService(Supabase);

export async function authenticationMiddleware(request: any, response: any, next: any) {
    const publicKey = getPublicKeyFromRequest(request);
    if(!publicKey) {
        console.info(`No public key provided`);
        sendUnauthorizedResponse(response);
        return;
    }

    const userKey = await getSecretKey(publicKey);
    if(userKey === null) {
        console.info(`No user key found for public key ${publicKey}`);
        sendUnauthorizedResponse(response);
        return;
    }

    const signature = request.headers['signature'];
    const formattedBody = JSON.stringify(request.body).replace(/\s/g, '');
    const isSignatureValid = verifyRequestSignature(userKey.secret_key, signature, formattedBody);
    if(!isSignatureValid) {
        console.error(`Invalid signature provided`);
        sendUnauthorizedResponse(response);
        return;
    }

    const role = userKey.role.toLowerCase() as UserKeyRole;
    const routeConfig = getRouteConfig(request.url, request.method, routeConfigs);
    if(!routeConfig || !canAccessRoute(routeConfig, role)) {
        console.info(`User with role ${role} is not allowed to access route ${routeConfig?.route}`);
        sendUnauthorizedResponse(response);
        return;
    }

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
        console.error(`Invalid signature provided. Secret: ${secretKey}, Signature: ${signature}, Message: ${JSON.stringify(message)}`);
        return false;
    }

    const hmac = crypto.createHmac('sha256', secretKey);
    hmac.update(message);
    const computedSignature = hmac.digest('hex');

    return signature.length === computedSignature.length && 
        crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computedSignature));
}

async function getSecretKey(publicKey: string): Promise<UserKey | null> {
    return await authenticationService.getApiKeysFromPublicKey(publicKey);
}

function getPublicKeyFromRequest(request: any) {
    return request.headers['public_key'];
}

function getBearerValue(bearerToken: string) {
    if (!bearerToken) {
        console.debug(`No bearer token provided`);
        return null;
    }

    const bearerTokenParts = bearerToken.split(' ');
    if(bearerTokenParts.length !== 2 || bearerTokenParts[0] !== 'Bearer') {
        console.info(`Invalid bearer token provided`);
        return null;
    }

    return bearerTokenParts[1];
}

function sendUnauthorizedResponse(response: any) {
    response.sendStatus(401);
}