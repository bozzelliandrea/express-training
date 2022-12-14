const express = require('express');
const path = require("path");
const app = express();
const port = 3000;

app.get('/health', (req, res) => {
    res.status(200).send();
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})
