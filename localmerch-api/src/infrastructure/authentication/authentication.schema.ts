import { checkSchema } from "express-validator";

export const createApiKey = checkSchema({
    userId: {
        errorMessage: 'UserId is required',
        exists: true,
        notEmpty: true,
        trim: true
    }
});