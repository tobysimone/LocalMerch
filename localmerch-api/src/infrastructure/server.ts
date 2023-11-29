import express, { Express } from 'express';

class Server {
    private expressInstance: Express;

    constructor() {
        this.expressInstance = express();
    }

    public get() {
        return this.expressInstance;
    }

    public start() {
        this.expressInstance.listen(3000, () => {
            console.log('Server started at http://localhost:3000');
        });
    }
}

export default new Server();