import dotenv from 'dotenv';

dotenv.config({path: './gateway.env'});

import express, {Express} from 'express';
import http from 'http';

const gateway: Express = express();

gateway.get('/photo', (req, res) => {
    http.get(`http://localhost:3000/photo`, proxy_res => {
        let data = ''

        proxy_res.on('data', (chunk) => {
            data += chunk;
        });

        proxy_res.on('end', () => {
            res.send(data);
        });
    }).on("error", (err) => {
        console.log("Error: ", err)
    }).end()
})

gateway.listen(process.env.PORT, () => {
    console.log(`Gateway online on http://localhost:${process.env.PORT}`)
});