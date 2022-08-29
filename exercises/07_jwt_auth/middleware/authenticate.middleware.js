const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error("No token found")
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        console.debug("Authentication found for user ", decoded)
        req.user = decoded;
        next();
    })
}