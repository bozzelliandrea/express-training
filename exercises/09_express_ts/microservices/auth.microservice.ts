import dotenv from 'dotenv';

dotenv.config();

import {PostgresDataSource} from "../db/postgres.datasource";
import express from "express";
import authRoute from "../routes/auth.route";
import responseMiddleware from "../middleware/response.middleware";
import errorMiddleware from "../middleware/error.middleware";
import userRoute from "../routes/user.route";

PostgresDataSource.initialize().then(() => {
    const app = express();

    app.use(express.json());
    app.use('/auth', authRoute);
    app.use('/users', userRoute)
    app.use(responseMiddleware);
    app.use(errorMiddleware);

    app.listen(process.env.AUTH_PORT, () => {
        console.log(`Auth Microservice ready on http://localhost:${process.env.AUTH_PORT}`)
    });
})