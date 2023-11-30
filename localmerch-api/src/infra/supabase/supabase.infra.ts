import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "../../@types/database.types";
import { DataProvider } from "../data/DataProvider";

export class LmSupabase implements DataProvider {
    instance: SupabaseClient;

    constructor(supabaseProjectUrl: string | undefined, supabaseKey: string | undefined) {
        if(!supabaseKey) {
            throw new Error('SUPABASE_KEY is not defined');
        }

        if(!supabaseProjectUrl) {
            throw new Error('SUPABASE_PROJECT_URL is not defined');
        }

        this.instance = createClient<Database>(supabaseProjectUrl, supabaseKey);
    }

    public insert(table: keyof Database['public']['Tables'], value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']) {
        return this.instance.from(table).insert(value);
    }

    public get() {
        return this.instance;
    }
}

export const Supabase = new LmSupabase(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_KEY);