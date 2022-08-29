const jwt = require('jsonwebtoken');

function generateToken(username) {
    return jwt.sign(
        {username},
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_VALIDITY + "s"
        })
}

module.exports = {
    generateToken
}