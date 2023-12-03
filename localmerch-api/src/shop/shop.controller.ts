import * as express from 'express';
import { Supabase } from '../infrastructure/supabase/supabase.infrastructure';
import { validate } from '../infrastructure/validation/schemaValidator.infrastructure';
import { BaseController } from '../shared/controller/BaseController';
import { createShop } from './shop.schema';
import { ShopService } from './shop.service';

export class ShopController implements BaseController {

    app: express.Express;
    shopService: ShopService;

    constructor(express: express.Express) {
        this.app = express;
        this.shopService = new ShopService(Supabase);
    }

    loadRoutes(): void {
        this.app.post('/shop', validate(createShop), async (request, response, next) => {
            try {
                const createdShop = await this.shopService.createShop(request.body);
                return response.status(200).json(createdShop);
            } catch (e) {
                next(e);
            }
        });
    }
}