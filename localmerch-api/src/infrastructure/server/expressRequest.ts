export interface ExpressRequest<T> extends Express.Request {
    body: T;
}