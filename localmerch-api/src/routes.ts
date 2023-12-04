import * as express from 'express';
import './shop/shop.controller';
import { ShopController } from './shop/shop.controller';
import { log } from './infrastructure/logging/logger.infrastructure';

export function loadRoutes(express: express.Express) {
    new ShopController(express).loadRoutes();
    log('Routes loaded');
}