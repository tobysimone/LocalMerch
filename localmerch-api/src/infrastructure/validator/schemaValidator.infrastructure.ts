import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const validate = (schemas: any) => {
    return async (request: Request, response: Response, next: any) => {
        await Promise.all(schemas.map((schema: any) => schema.run(request)));

        const result = validationResult(request);
        if (result.isEmpty()) {
            return next();
        }

        const errors = result.array();
        return response.status(400).json({ errors });
    }
}