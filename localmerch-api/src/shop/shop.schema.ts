import { checkSchema } from "express-validator";

export const createShop = checkSchema({
    name: {
        errorMessage: 'Name is required',
        exists: true,
        notEmpty: true,
        trim: true
    }
});