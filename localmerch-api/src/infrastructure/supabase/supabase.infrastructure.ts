import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { Database } from "../../@types/database/database.types";
import { DataProvider, GetByIdResult, InsertResult } from "../data/DataProvider.infrastructure";
import { ServerError } from "../server/serverError";
import { log } from "../logging/logger.infrastructure";

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
        log('Supabase instance created');
    }

    async getByEqQuery<R>(table: string, eqKey: string, eqValue: string): Promise<GetByIdResult<R>> {
        if(!eqKey || !eqValue) {
            return {
                data: null,
                error: new Error('eqKey or eqValue is not defined')
            };
        }

        const { data, error } = await this.instance
            .from(table)
            .select('*')
            .eq(eqKey, eqValue)
            .single();
            
        if(error) {
            throw new ServerError(error.message, 500);
        }

        return {
            data,
            error
        }
    }

    getById<R>(table: keyof Database['public']['Tables'], id: number): Promise<GetByIdResult<R>>;
    getById<R>(table: keyof Database['public']['Tables'], id: number, idColumn: string): Promise<GetByIdResult<R>>;
    public async getById<R>(table: keyof Database['public']['Tables'], id: number, idColumn: string = 'id'): Promise<GetByIdResult<R>> {
        if(!idColumn) {
            idColumn = 'id';
        }
        
        const { data, error } = await this.instance
            .from(table)
            .select('*')
            .eq('id', id)
            .single();
        
        if(error) {
            throw new ServerError(error.message, 500);
        }

        return {
            data,
            error
        }
    }

    public async insert<R>(table: keyof Database['public']['Tables'], value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']): Promise<InsertResult<R>> {
        const { data, error } = await this.instance
            .from(table)
            .insert(value)
            .select('*')
            .single();

        return {
            data,
            error
        };
    }

    public async upsert<R>(table: keyof Database['public']['Tables'], value: Database['public']['Tables'][keyof Database['public']['Tables']]['Insert']): Promise<InsertResult<R>> {
        const { data, error } = await this.instance
            .from(table)
            .upsert(value)
            .select('*')
            .single();

        if(error) {
            throw new ServerError(error.message, 500);
        }

        return {
            data,
            error
        };
    }
}

export const Supabase = new LmSupabase(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_KEY);