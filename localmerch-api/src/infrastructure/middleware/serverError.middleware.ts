import { ServerError } from "../server/serverError";

export function serverErrorMiddleware(error: ServerError, _request: any, response: any, next: any) {
    if(error) {
        console.error(error);
        return response.status(500).json({ data: null, error: 'Internal server error' });
    }

    next();
}