import { fatal } from "../infrastructure/logging/logger.infrastructure";
import { ServerError } from "../infrastructure/server/serverError";

const INTERNAL_SERVER_ERROR = 'Internal Server Error';

const GENERIC_SERVER_ERROR: ServerError = {
    name: INTERNAL_SERVER_ERROR,
    message: INTERNAL_SERVER_ERROR,
    errorDetail: INTERNAL_SERVER_ERROR,
    statusCode: 500
};

export function mapPsqlShopError(errorDetail?: string, code?: string): ServerError | null {
    if(!code && !errorDetail) {
        return null;
    }

    fatal(`Mapping shopError: { detail: ${errorDetail}, code: ${code} }`);
    switch(code) {
        case '23505':
            return {
                name: 'Error',
                message: 'Shop already exists',
                errorDetail: `${code} - ${errorDetail}`,
                statusCode: 409
            };
        case '23502':
            return {
                name: 'Error',
                message: 'Internal Server Error',
                errorDetail: `${code} - ${errorDetail}`,
                statusCode: 500
            };
        default:
            return GENERIC_SERVER_ERROR;
    }
}