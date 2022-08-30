const loggerMiddleware = (req, res, next) => {
    console.info(`${new Date()}: \t ${req.method} \t ${req.path}`);
    next();
}

module.exports = loggerMiddleware