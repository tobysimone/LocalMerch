import { NextFunction } from "express";

export function tryRoute(fn: () => any, next: NextFunction) {
    try {
        return fn();
    } catch (e) {
        next(e);
    }
}