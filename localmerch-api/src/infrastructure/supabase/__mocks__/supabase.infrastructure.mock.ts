import { DataProvider, GetByIdResult, InsertResult, UpsertResult } from "../../data/DataProvider.infrastructure";

export class MockShopDataProvider implements DataProvider {
    private mockData: any = [];

    async insert<R>(_: any, value: any): Promise<InsertResult<R>> {
        if(!value.name) {
            return {
                data: null,
                error: new Error('Shop name is required')
            }
        }

        this.mockData.push(value);
        return {
            data: value,
            error: null
        };
    }

    upsert<R>(table: string, value: any): Promise<UpsertResult<R>> {
        throw new Error("Method not implemented.");
    }

    getById<R>(table: string, id: number): Promise<GetByIdResult<R>> {
        throw new Error("Method not implemented.");
    }

    getByEqQuery<R>(table: string, eqKey: string, eqValue: string): Promise<GetByIdResult<R>> {
        throw new Error("Method not implemented.");
    }
}

export class MockAuthenticationServiceDataProvider implements DataProvider {
    private mockData: any = [];

    async insert<R>(table: string, value: any): Promise<InsertResult<R>> {
        this.mockData.push(value);
        return {
            data: value,
            error: null
        };
    }

    async upsert<R>(table: string, value: any): Promise<UpsertResult<R>> {
        this.mockData.push(value);
        return {
            data: value,
            error: null
        }
    }

    getById<R>(table: string, id: number): Promise<GetByIdResult<R>>;
    getById<R>(table: string, id: number, idColumn: string): Promise<GetByIdResult<R>>;
    async getById<R>(table: string, id: number, idColumn?: string): Promise<GetByIdResult<R>> {
        return new Promise((resolve, reject) => {
            const data = this.mockData.find((data: any) => data.user_id === id);
            if(!data) {
                return resolve({
                    data: null,
                    error: new Error('User not found')
                });
            }

            return resolve({
                data,
                error: null
            });
        });
    }

    async getByEqQuery<R>(table: string, eqKey: string, eqValue: string): Promise<GetByIdResult<R>> {
        const data = this.mockData.find((data: any) => data[eqKey] === eqValue);
        return {
            data,
            error: null
        };
    }
}