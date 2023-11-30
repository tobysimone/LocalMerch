import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "../../@types/database.types";
import { DataProvider, InsertResult } from "../data/DataProvider";

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
        console.debug('Supabase instance created');
    }

    public async insert<R>(table: keyof Database['public']['Tables'], value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']): Promise<InsertResult<R>> {
        const { data, error } = await this.instance
            .from(table)
            .insert(value)
            .select('*')
            .single();

        if(error) {
            console.error(error);
        }

        return {
            data: data,
            error
        };
    }
}

export const Supabase = new LmSupabase(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_KEY);