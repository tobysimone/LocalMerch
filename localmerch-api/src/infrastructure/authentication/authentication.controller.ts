import { BaseController } from "../../shared/controller/BaseController";
import * as express from 'express';
import { AuthenticationService } from "./authentication.service";
import { Supabase } from "../supabase/supabase.infrastructure";

export class AuthenticationController implements BaseController {
    express: express.Express;
    authenticationService: AuthenticationService;

    constructor(express: express.Express) {
        this.express = express;
        this.authenticationService = new AuthenticationService(Supabase);
    }

    loadRoutes(): void {
        this.express.post('/user/api-key', async (request, response, next) => {
            try {
                const apiKey = await this.authenticationService.createApiKey(request.body);
                return response.status(200).json(apiKey);
            } catch (e) {
                next(e);
            }
        });
    }
}