import { Database } from './database-generated.types';
export type { Database } from './database-generated.types';

export type Query<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Insert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];