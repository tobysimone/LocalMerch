export type InsertResult<T> = {
    data: T | {};
    error: any;
}

export interface DataProvider {
    insert<R>(
        table: string,
        value: any
    ): Promise<InsertResult<R>>;
}