export type PayloadData<T> = T | null;

export type InsertResult<T> = {
    data: PayloadData<T>;
    error: any;
}

export type UpsertResult<T> = {
    data: PayloadData<T>;
    error: any;
}

export type GetByIdResult<T> = {
    data: PayloadData<T>;
    error: any;
}

export interface DataProvider {
    getById<R>(
        table: string,
        id: number
    ): Promise<GetByIdResult<R>>;

    getById<R>(
        table: string,
        id: number,
        idColumn: string
    ): Promise<GetByIdResult<R>>;

    getByEqQuery<R>(
        table: string,
        eqKey: string,
        eqValue: string
    ): Promise<GetByIdResult<R>>;

    insert<R>(
        table: string,
        value: any
    ): Promise<InsertResult<R>>;

    upsert<R>(
        table: string,
        value: any
    ): Promise<UpsertResult<R>>;
}