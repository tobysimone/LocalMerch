import { serverLogger } from "../../config/serverLogger/serverLogger.config";
import { log } from "../logging/logger.infrastructure";

export function serverLoggerMiddleware(request: any, response: any, next: any) {
    serverLogger(request, response);
    next();
}