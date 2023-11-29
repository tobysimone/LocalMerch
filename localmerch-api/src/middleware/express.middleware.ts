import supabase from '../infrastructure/supabase';
import { Express } from 'express';

export function configureExpressMiddleware(express: Express) {
    console.log('Configuring express middleware');
    express.use((request: any, _: any, next: any) => {
        request.supabase = supabase.get();
        next();
    });
}