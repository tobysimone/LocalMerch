import { SupabaseClient, createClient } from "@supabase/supabase-js";

class Supabase {
    private supabase: SupabaseClient;

    constructor() {
        const key = process.env.SUPABASE_KEY;
        if(!key) {
            throw new Error('SUPABASE_KEY is not defined');
        }

        this.supabase = createClient('https://rtfbojnxphwgmqnkwpyj.supabase.co', key);
    }

    public get() {
        return this.supabase;
    }
}

export default new Supabase();