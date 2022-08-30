const jwt = require('jsonwebtoken');
const {generateToken} = require("07_jwt_auth/common/auth");
const userRepository = require('../repositories/user.repository');
const AuthError = require("../errors/auth.error");

class AuthService {

    async register(username, email, password) {
        const result = await userRepository.findUser(username, email);

        if (result.length > 0) {
            throw new AuthError(500, "User already registered");
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

    async login(username, password) {
        const result = await userRepository.findUser(username);

        if (result.length === 0) {
            throw new AuthError(404, "User not found");
        }

        const user = result[0];

        if (user.password !== password) {
            throw new AuthError(401, "Wrong password, login failed!");
        }

        return generateToken(user.username);
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