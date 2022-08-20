const path = require("path");
const express = require('express')();
const todoList = ["ahahaha"];
const bodyParser = require('body-parser')

express.use(bodyParser.urlencoded({extended: true}))

express.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

express.get('/todo', function (req, res) {
    res.status(200).send(todoList);
})

express.post('/todo', bodyParser.json(), function (req, res) {
    todoList.push(req.body.value);
    res.send(req.body.value);
})

express.listen(3000, () => {
    console.log(`Example app listening on port http://localhost:${3000}`)
})
