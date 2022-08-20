const app = require('express')();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const taskRoute = require('./route/task.route');

const start = async () => {
    await mongoose.connect('mongodb://root:example@mongo:27017', {
        dbName: 'todo',
        autoIndex: true
    })
}

start().then(() => {
    app.listen(3000, () => {
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json());
        app.use('/todo', taskRoute);
        console.log(`Mongo ToDo List App listening on port http://localhost:${3000}`)
    })
});