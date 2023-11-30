import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "../../@types/database.types";

export interface DataProvider {
    insert: (table: keyof Database['public']['Tables'], value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']) => any;
}

export class LmSupabase implements DataProvider {
    instance: SupabaseClient;

    constructor(supabaseKey: string | undefined) {
        if(!supabaseKey) {
            throw new Error('SUPABASE_KEY is not defined');
        }

        this.instance = createClient<Database>('https://rtfbojnxphwgmqnkwpyj.supabase.co', supabaseKey);
    }

    public insert(table: keyof Database['public']['Tables'], value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']) {
        return this.instance.from(table).insert(value);
    }

    public get() {
        return this.instance;
    }
}

export const Supabase = new LmSupabase(process.env.SUPABASE_KEY);