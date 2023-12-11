import { Database } from './databaseGenerated.types';
export type { Database } from './databaseGenerated.types';

export type Query<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type Insert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];

export type InsertUserKey = Insert<'user_key'>;
export type UserKey = Query<'user_key'>;

export type InsertShop = Insert<'shop'>;
export type Shop = Query<'shop'>;

export type InsertCategory = Insert<'category'>;
export type Category = Query<'category'>;