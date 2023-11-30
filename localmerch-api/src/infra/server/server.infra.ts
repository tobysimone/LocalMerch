import express, { Express } from 'express';

class ExpressServer {
    private instance: Express;

    constructor() {
        this.instance = express();
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