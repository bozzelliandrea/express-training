import {DataSource} from "typeorm";
import {Photo} from "./entity/photo.entity";

export const PostgresDataSource = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Photo],
})