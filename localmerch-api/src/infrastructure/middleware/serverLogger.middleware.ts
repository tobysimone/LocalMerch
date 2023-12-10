import { log } from "../logging/logger.infrastructure";

export function serverLoggerMiddleware(request: any, response: any, next: any) {
    log(request);
    //serverLogger(request, response);
    next();
}