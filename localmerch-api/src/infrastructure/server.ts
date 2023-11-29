import express, { Express } from 'express';
import { configureExpressMiddleware } from '../middleware/express.middleware';

class ExpressServer {
    private expressInstance: Express;

    constructor() {
        this.expressInstance = express();
        configureExpressMiddleware(this.expressInstance);
    }

    public get() {
        return this.expressInstance;
    }

    public start() {
        const port = process.env.SERVER_PORT;
        this.expressInstance.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    }
}

export default new ExpressServer();