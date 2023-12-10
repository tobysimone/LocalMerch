export class ServerError extends Error {
    errorDetail: string;

    constructor(message: string, errorDetail: string, public statusCode: number = 500) {
        super(message);
        this.errorDetail = errorDetail;
    }
}