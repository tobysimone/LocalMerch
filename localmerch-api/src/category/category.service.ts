import { Category, InsertCategory, Shop } from "../@types/database/database.types";
import { DataProvider, InsertResult } from "../infrastructure/data/DataProvider.infrastructure";

export class CategoryService {
    constructor(private dp: DataProvider) {}

    public async createCategory(category: InsertCategory): Promise<InsertResult<Category>> {
        return await this.dp.insert('category', category);
    }
}