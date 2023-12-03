import * as express from 'express';
import './shop/shop.controller';
import { ShopController } from './shop/shop.controller';

export function loadRoutes(express: express.Express) {
    new ShopController(express).loadRoutes();
    console.log('Routes loaded');
}