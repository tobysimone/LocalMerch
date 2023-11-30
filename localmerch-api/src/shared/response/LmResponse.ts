export interface LmResponse {
    data?: any;
    error?: Array<LmResponseError>;
}

export interface LmResponseError {
    message: string;
    detail: any;
}