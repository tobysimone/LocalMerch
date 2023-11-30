import { DataProvider, InsertResult } from "../../data/DataProvider";

export class MockShopDataProvider implements DataProvider {
    private mockData: any = [];

    async insert<R>(_: any, value: any): Promise<InsertResult<R>> {
        if(!value.name) {
            return {
                data: {},
                error: new Error('Shop name is required')
            }
        }

        this.mockData.push(value);
        return {
            data: value,
            error: null
        };
    }
}