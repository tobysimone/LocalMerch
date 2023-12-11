import * as express from 'express';
import { BaseController } from '../shared/controller/BaseController';
import { createCategory } from './category.schema';
import { validate } from '../infrastructure/validation/schemaValidator.infrastructure';
import { tryRoute } from '../util/route/tryRoute';
import { CategoryService } from './category.service';
import { ShopService } from '../shop/shop.service';
import { ServerError } from '../infrastructure/server/serverError';

export class CategoryController implements BaseController {
    express: express.Express;

    categoryService: CategoryService;
    shopService: ShopService;

    constructor(express: express.Express, categoryService: CategoryService, shopService: ShopService) {
        this.express = express;
        this.categoryService = categoryService;
        this.shopService = shopService;
    }

    loadRoutes(): void {
        this.express.post('/category', validate(createCategory), async (request, response, next) => {
            tryRoute(async () => {
                const shop = await this.shopService.getShopByUserId(request.userId);
                if(!shop || !shop.data) {
                    next(new ServerError('Shop not found', `No shop associated with userId: ${request.userId}`, 404));
                    return;
                }

                const {
                    data: category,
                    error
                } = await this.categoryService.createCategory(request.body);
                if(error) {
                    return next(error);
                }

                return response.status(200).json(category);
            }, next);
        });
    }
}