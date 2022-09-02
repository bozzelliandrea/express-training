import dotenv from 'dotenv';

dotenv.config();
import errorHandler from '../middleware/error.middleware';
import responseHandler from '../middleware/response.middleware';
import express, {Express} from 'express';
import "reflect-metadata";
import {PostgresDataSource} from "../db/postgres.datasource";
import photoRoute from "../routes/photo.route";

PostgresDataSource.initialize().then(() => {
    const app: Express = express();
    app.use(express.json());
    app.use('/photo', photoRoute);
    app.use(responseHandler);
    app.use(errorHandler);

    app.listen(process.env.PHOTO_PORT, () => {
        console.log(`Photo microservice running on http://localhost:${process.env.PHOTO_PORT}`)
    });
}).catch((err: string) => {
    console.error(err);
    process.exit(1)
})
