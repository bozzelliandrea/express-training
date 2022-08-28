const express = require('express');
const fs = require('node:fs');
const {getAllUsers, insertMultipleRows} = require('./user.service')

const {Client} = require("pg");

const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: 'password',
})

client.connect().then(() => {
    const app = express();

    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    app.use(express.json());

    app.post('/users', (req, res) => {
        console.log("Received Request");
        fs.appendFileSync('file.txt', JSON.stringify(req.body) + '\n');
        insertMultipleRows(client, req.body).then(r => {
            console.log("File creted");
            res.send();
        })
    })

    app.get('/users', (req, res) => {
        getAllUsers(client).then(r => {
            console.log(r)
            res.send(r.rows)
        }).catch(err => console.error(err));
    })


    app.listen(3000, () => {
        console.log("Application ready on http://localhost:3000");
    })
})


process.on("uncaughtException", async (err) => {
    console.error("Failed", err);
})

process.on('exit', async () => {
    await client.end();
});