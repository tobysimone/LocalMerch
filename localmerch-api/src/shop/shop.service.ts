import { InsertShop, Shop } from "../@types/database.types";
import { DataProvider, InsertResult } from "../infrastructure/data/DataProvider.infrastructure";

export class ShopService {
    constructor(private dp: DataProvider) {}

    public async createShop(shop: InsertShop): Promise<InsertResult<Shop>> {
        return await this.dp.insert('shop', shop);
    }
}