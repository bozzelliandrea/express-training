import dotenv from 'dotenv';

dotenv.config();

import express, {Express} from 'express';
import "reflect-metadata";
import {PostgresDataSource} from "./db/postgres.datasource";
import photoRoute from "./routes/photo.route";

PostgresDataSource.initialize().then(() => {
    const app: Express = express();
    app.use(express.json());

    app.use('/photo', photoRoute);

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Running on http://localhost:${process.env.SERVER_PORT}`)
    })
}).catch((err: string) => {
    console.error(err);
    process.exit(1)
})
