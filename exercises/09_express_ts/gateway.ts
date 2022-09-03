import dotenv from 'dotenv';

dotenv.config({path: './gateway.env'});

import express, {Express} from 'express';
import http, {RequestOptions} from 'http';
//TODO
const CONFIG = [];

const gateway: Express = express();
gateway.use(express.json());
gateway.get('/photo', (req, res) => {
    http.get(`http://localhost:3000/photo`, proxy_res => {
        let data = ''

        proxy_res.on('data', (chunk) => {
            data += chunk;
        });

        proxy_res.on('end', () => {
            res.setHeader('Content-Type', proxy_res.headers["content-type"]);
            res.send(data);
        });
    }).on("error", (err) => {
        console.log("Error: ", err)
    }).end()
})

gateway.post('/photo', (req, res) => {

    const data = JSON.stringify(req.body);

    const option: RequestOptions = {
        hostname: 'localhost',
        port: '3000',
        path: '/photo',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length,
        }
    }

    const internal_req = http.request(option, proxy_res => {
        let data = ''

        proxy_res.on('data', (chunk) => {
            data += chunk;
        });

        proxy_res.on('end', () => {
            res.setHeader('Content-Type', proxy_res.headers["content-type"]);
            res.send(data);
        });
    }).on("error", (err) => {
        console.log("Error: ", err)
    });
    internal_req.write(data);
    internal_req.end()
})

gateway.listen(process.env.PORT, () => {
    console.log(`Gateway online on http://localhost:${process.env.PORT}`)
});