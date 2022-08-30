const jwt = require('jsonwebtoken');
const AuthError = require("../errors/auth.error");
const logger = require("../commons/logger");

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new AuthError(401, "No token found")
    }

    jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, decoded) => {
        if (err) {
            throw new AuthError(403, "Token invalid or expired!")
        }

        logger("Authentication found for user " + decoded.username);
        req.user = decoded;
        next();
    })
}