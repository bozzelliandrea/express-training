const express = require('express');
const fs = require('node:fs');

const app = express();

app.use(express.json());

app.post('/user', (req, res) => {
    console.log("Received Request");
    console.log(req.body);
    fs.appendFileSync('file.txt', JSON.stringify(req.body) + '\n');
    res.send();
})


app.listen(3000, () => {
    console.log("Application ready on http://localhost:3000");
})


