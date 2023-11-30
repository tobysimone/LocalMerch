import { Insert, Query } from "../@types/database.types";
import { DataProvider, InsertResult } from "../infrastructure/data/DataProvider.infrastructure";

export class ShopService {
    constructor(private dp: DataProvider) {}

    public async createShop(shop: Insert<'shop'>): Promise<InsertResult<Query<'shop'>>> {
        return await this.dp.insert('shop', shop);
    }
}