import { Database } from "../../@types/database-generated.types";

export interface DataProvider {
    insert: (
        table: keyof Database['public']['Tables'], 
        value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']
    ) => any;
}