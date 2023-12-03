import express, { Express } from 'express';
import helmet from 'helmet';

class ExpressServer {
    private instance: Express;

    constructor() {
        this.instance = express();

        this.instance.disable('x-powered-by');
        this.instance.use(express.json());
        this.instance.use(helmet())
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