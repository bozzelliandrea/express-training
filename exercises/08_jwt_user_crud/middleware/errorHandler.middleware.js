const errorHandlerMiddleware = (err, req, res, next) => {
    res.status(err.code).send({
        code: err.code,
        error: err.name,
        message: err.message
    })
}

module.exports = errorHandlerMiddleware;