const logger = require('../commons/logger');

module.exports = function (req, res, next) {
    logger(`${req.method} \t ${req.path}`);
    next();
}
