import { InsertShop, Shop } from "../@types/database/database.types";
import { DataProvider, GetByIdResult, InsertResult } from "../infrastructure/data/DataProvider.infrastructure";

export class ShopService {
    constructor(private dp: DataProvider) {}

    public async createShop(shop: InsertShop): Promise<InsertResult<Shop>> {
        return await this.dp.insert('shop', shop);
    }

    public async getShopByUserId(userId: string): Promise<GetByIdResult<Shop>> {
        return await this.dp.getByEqQuery('shop', 'user_id', userId);
    }
}