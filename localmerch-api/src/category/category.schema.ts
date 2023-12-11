import { checkSchema } from "express-validator";

export const createCategory = checkSchema({
    name: {
        errorMessage: 'Name is required',
        exists: true,
        notEmpty: true,
        trim: true
    },
    slug: {
        errorMessage: 'Slug is required',
        exists: true,
        notEmpty: true,
        trim: true
    }
});