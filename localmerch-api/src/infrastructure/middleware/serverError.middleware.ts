import { fatal } from "../logging/logger.infrastructure";
import { ServerError } from "../server/serverError";

export function serverErrorMiddleware(error: ServerError, _request: any, response: any, next: any) {
    if(error) {
        fatal(JSON.stringify(error));
        return response.status(error.statusCode).json({ data: null, error: error.message });
    }

    next();
}