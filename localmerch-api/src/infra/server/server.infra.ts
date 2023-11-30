import express, { Express } from 'express';
import { configure as configureMiddleware } from '../middleware/express.middleware';

class ExpressServer {
    private instance: Express;

    constructor() {
        this.instance = express();
        this.instance.use(express.json());
        configureMiddleware(this.instance);
    }

    public get() {
        return this.instance;
    }

    public start() {
        const port = process.env.SERVER_PORT;
        this.instance.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    }
}

export default new ExpressServer();