import * as express from 'express';
import './shop/shop.controller';
import { ShopController } from './shop/shop.controller';
import { log } from './infrastructure/logging/logger.infrastructure';
import { AuthenticationController } from './infrastructure/authentication/authentication.controller';

export function loadRoutes(express: express.Express) {
    new ShopController(express).loadRoutes();
    new AuthenticationController(express).loadRoutes();
    log('Routes loaded');
}