import * as express from 'express';
import { Supabase } from '../infrastructure/supabase/supabase.infrastructure';
import { validate } from '../infrastructure/validation/schemaValidator.infrastructure';
import { BaseController } from '../shared/controller/BaseController';
import { tryRoute } from '../util/route/tryRoute';
import { createShop } from './shop.schema';
import { ShopService } from './shop.service';

export class ShopController implements BaseController {
    express: express.Express;
    shopService: ShopService;

    constructor(express: express.Express) {
        this.express = express;
        this.shopService = new ShopService(Supabase);
    }

    async createShop(request: any, response: any, next: any) {
        tryRoute(async () => {
            const {
                data: shop,
                error
            } = await this.shopService.createShop({ user_id: request.userId, ...request.body });
            if(error) {
                return next(error);
            }

            return response.status(200).json(shop);
        }, next);
    }

    async getShop(request: any, response: any, next: any) {
        tryRoute(async () => {
            const {
                data: shop,
                error
            } = await this.shopService.getShopByUserId(request.userId);
            if(error) {
                return next(error);
            }

            return response.status(200).json(shop);
        }, next);
    }

    loadRoutes(): void {
        this.express.post('/shop',
            validate(createShop),
            async (request, response, next) => this.createShop(request, response, next));
        
        this.express.get('/shop',
            async (request, response, next) => this.getShop(request, response, next));
    }
}