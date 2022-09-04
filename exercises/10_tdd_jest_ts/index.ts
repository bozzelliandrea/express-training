import * as fs from 'fs';
import * as readline from 'readline';
import * as dotenv from 'dotenv';

dotenv.config();

import {DataSource} from "typeorm";
import {User} from "./user.entity";

const db = new DataSource({
    type: "postgres",
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DB_NAME,
    synchronize: true,
    logging: true,
    entities: [User]
})

function main(): Promise<number> {
    console.log("CSV Reader Start");
    return new Promise(async (resolve, reject) => {
        const stream: fs.ReadStream = fs.createReadStream("fake.csv");
        const reader = readline.createInterface({
            input: stream,
            crlfDelay: Infinity
        });
        const repository = db.getRepository(User);

        let count = 0;
        let skip = true;

        for await (const line of reader) {
            if (skip) {
                skip = false;
                continue;
            }

            const rowSplitted = line.split(",");
            await repository.insert(new User(rowSplitted[1] + rowSplitted[2], rowSplitted[3]))
            count++;
        }
        console.log("CSV Reader End");
        resolve(count);
    });
}

db.initialize().then(() => {
    main().then((count) => {
        console.log(`Process End: total rows processed ${count}`);
        process.exit(0);
    }).catch(err => {
        console.error(err)
        process.exit(1);
    });
}).catch(err => console.error(err));
