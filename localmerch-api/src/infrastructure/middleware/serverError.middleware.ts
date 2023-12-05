import { fatal, log } from "../logging/logger.infrastructure";
import { ServerError } from "../server/serverError";

export function serverErrorMiddleware(error: ServerError, _request: any, response: any, next: any) {
    log('server error middleware');
    if(error) {
        fatal(error);
        return response.status(500).json({ data: null, error: 'Internal server error' });
    }

    next();
}