import * as express from 'express';
import { BaseController } from "../../shared/controller/BaseController";
import { tryRoute } from "../../util/route/tryRoute";
import { Supabase } from "../supabase/supabase.infrastructure";
import { validate } from "../validation/schemaValidator.infrastructure";
import { createApiKey } from "./authentication.schema";
import { AuthenticationService } from "./authentication.service";

export class AuthenticationController implements BaseController {
    express: express.Express;
    authenticationService: AuthenticationService;

    constructor(express: express.Express) {
        this.express = express;
        this.authenticationService = new AuthenticationService(Supabase);
    }

    loadRoutes(): void {
        this.express.post('/user/api-key', validate(createApiKey), async (request, response, next) => {
            tryRoute(async () => {
                const userId = request.body.userId;
                const apiKey = this.authenticationService.generateUserKey();
                const { userKey, error } = await this.authenticationService.createUserKey(userId, apiKey);
                if(error) {
                    return next(error);
                }

                return response.status(200).json(userKey);
            }, next);
        });
    }
}