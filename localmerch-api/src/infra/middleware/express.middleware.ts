import { Express } from "express";
import { ValidationError } from "express-json-validator-middleware";

export function configure(express: Express) {
    express.use((error: any, _: any, response: any, next: any) => {
        if(error instanceof ValidationError) {
            response.status(400).send(error.validationErrors);
            next();
        } else {
            next(error);
        }
    });
}