import { Database } from "../../../@types/database-generated.types";
import { DataProvider } from "../../data/DataProvider";

export class MockShopDataProvider implements DataProvider {
    private mockData: any = [];

    insert(_: keyof Database['public']['Tables'], value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']): any {
        this.mockData.push(value);
        return {
            select: () => ({
                single: () => value
            })
        }
    }
}