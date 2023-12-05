import express, { Express } from 'express';
import helmet from 'helmet';
import { authenticationMiddleware } from '../middleware/authentication.middleware';
import { serverErrorMiddleware } from '../middleware/serverError.middleware';
import { loadRoutes } from '../../routes';
import { serverLoggerMiddleware } from '../middleware/serverLogger.middleware';
import { log } from '../logging/logger.infrastructure';

class ExpressServer {
    private instance: Express;

    constructor() {
        this.instance = express();

        this.instance.disable('x-powered-by');
        this.instance.use(express.json());
        this.instance.use(helmet());
        this.instance.use(serverLoggerMiddleware);
        this.instance.use(authenticationMiddleware);
        this.instance.use(serverErrorMiddleware);
        loadRoutes(this.instance);
    }

    public get() {
        return this.instance;
    }

    public start() {
        const port = process.env.SERVER_PORT;
        this.instance.listen(port, () => {
            log(`Server started at http://localhost:${port}`);
        });
    }
}

export default new ExpressServer();