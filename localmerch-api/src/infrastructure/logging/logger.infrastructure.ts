import pino from "pino";

export class Logger {
    private static instance: pino.Logger;

    private constructor() {} 

    public static getInstance(): pino.Logger {
        if (!Logger.instance) {
            Logger.instance = pino({
                level: process.env.LOG_LEVEL || 'info',
                transport: {
                    target: 'pino-pretty',
                    options: {
                        colorize: true
                    }
                }
            });
        }

        return Logger.instance;
    }
}

export function log(msg: string) {
    Logger.getInstance().info(msg);
}

export function warn(warn: string) {
    Logger.getInstance().warn(warn);
}

export function fatal(error: string | Error, msg?: string) {
    Logger.getInstance().error(error, msg);
}