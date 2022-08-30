const logger = require('../commons/logger');

module.exports = function (err, req, res, next) {
    logger(err.message);

    res.status(err.code).send({
        code: err.code,
        error: err.name,
        message: err.message
    })
}
