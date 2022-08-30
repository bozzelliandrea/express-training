require('dotenv').config()

const express = require('express');
const server = express();

server.use(
    express.json(),
    express.urlencoded({
        extended: true
    }),
);
server.use(require('./middleware/logger.middleware'));

server.use('/users', require('./routes/user.route'));
server.use('/auth', require('./routes/auth.route'));

server.listen(process.env.SERVER_PORT, () => {
    console.log(`JWT Server Ready on http://localhost:${process.env.SERVER_PORT}`)
});

server.use(require('./middleware/errorHandler.middleware'));

process.on('uncaughtException', function (err) {
    console.error(err);
});
