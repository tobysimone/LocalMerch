import { BaseController } from "../../shared/controller/BaseController";
import * as express from 'express';
import { AuthenticationService } from "./authentication.service";
import { Supabase } from "../supabase/supabase.infrastructure";
import { createApiKey } from "./authentication.schema";
import { validate } from "../validation/schemaValidator.infrastructure";
import { fatal } from "../logging/logger.infrastructure";

export class AuthenticationController implements BaseController {
    express: express.Express;
    authenticationService: AuthenticationService;

    constructor(express: express.Express) {
        this.express = express;
        this.authenticationService = new AuthenticationService(Supabase);
    }

    loadRoutes(): void {
        this.express.post('/user/api-key', validate(createApiKey), async (request, response, next) => {
            try {
                const userId = request.body.userId;
                const apiKey = this.authenticationService.generateApiKey();
                const userKey = await this.authenticationService.createApiKey(userId, apiKey);
                return response.status(200).json(userKey);
            } catch (e) {
                next(e);
            }
        });
    }
}