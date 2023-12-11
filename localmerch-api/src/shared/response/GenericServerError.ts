import { ServerError } from "../../infrastructure/server/serverError";

export const INTERNAL_SERVER_ERROR = 'Internal Server Error';

export const GENERIC_SERVER_ERROR: ServerError = {
    name: INTERNAL_SERVER_ERROR,
    message: INTERNAL_SERVER_ERROR,
    errorDetail: INTERNAL_SERVER_ERROR,
    statusCode: 500
};