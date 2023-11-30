import { Request, Response } from "express";
import { ValidationError, validationResult } from "express-validator";

export const validate = (schemas: any) => {
    return async (request: Request, response: Response, next: any) => {
        await Promise.all(schemas.map((schema: any) => schema.run(request)));

        const validationErrors = validationResult(request);
        if (validationErrors.isEmpty()) {
            return next();
        }

        return response.status(400).json({
            errors: validationErrors.array().map((error: ValidationError) => {
                return {
                    message: error.msg,
                    detail: error,
                };
            }),
        });
    }
}