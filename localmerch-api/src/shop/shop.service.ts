import { Insert } from "../@types/database.types";
import { DataProvider } from "../infra/supabase/supabase.infra";

export class ShopService {
    constructor(private dp: DataProvider) {}

    public async createShop(shop: Insert<'shop'>): Promise<any> {
        return await this.dp.insert('shop', shop).select('*').single();
    }
}