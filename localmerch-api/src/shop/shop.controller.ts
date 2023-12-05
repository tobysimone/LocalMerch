import * as express from 'express';
import { Supabase } from '../infrastructure/supabase/supabase.infrastructure';
import { validate } from '../infrastructure/validation/schemaValidator.infrastructure';
import { BaseController } from '../shared/controller/BaseController';
import { createShop } from './shop.schema';
import { ShopService } from './shop.service';
import { ServerError } from '../infrastructure/server/serverError';
import { tryRoute } from '../util/route/tryRoute';

export class ShopController implements BaseController {
    express: express.Express;
    shopService: ShopService;

    constructor(express: express.Express) {
        this.express = express;
        this.shopService = new ShopService(Supabase);
    }

    loadRoutes(): void {
        this.express.post('/shop', validate(createShop), async (request, response, next) => {
            tryRoute(async () => {
                const { 
                    data: shop, 
                    error 
                } = await this.shopService.createShop(request.body);

                if(error) {
                    return next(new ServerError(error, 500));
                }

                return response.status(200).json(shop);
            }, next);
        });
    }
}