const jwt = require('jsonwebtoken');
const {generateToken} = require("07_jwt_auth/common/auth");
const userRepository = require('../repositories/user.repository');

class AuthService {

    async register(username, email, password) {
        const result = await userRepository.findUser(username, email);

        if (result.length > 0) {
            console.error("User already registered")
            throw new Error("User already registered");
        }

        const response = await userRepository.create({
            username,
            email,
            password
        });

        return response.rowCount === 1
            ? {
                username,
                email
            }
            : {};
    }

    login(username, password) {

        return generateToken(username);
    }

    #generateToken(username) {
        return jwt.sign(
            {username},
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_VALIDITY + "s"
            })
    }
}

module.exports = new AuthService();