import { DataProvider, InsertResult } from "../../data/DataProvider";

export class MockShopDataProvider implements DataProvider {
    private mockData: any = [];

    async insert<R>(_: any, value: any): Promise<InsertResult<R>> {
        this.mockData.push(value);
        return {
            data: value,
            error: null
        };
    }
}