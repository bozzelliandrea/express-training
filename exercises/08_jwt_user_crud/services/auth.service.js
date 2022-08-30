const jwt = require('jsonwebtoken');
const {generateToken} = require("07_jwt_auth/common/auth");
const userRepository = require('../repositories/user.repository');
const AuthError = require("../errors/auth.error");
const crypto = require('node:crypto');
const logger = require("../commons/logger");

class AuthService {

    async register(username, email, password) {
        const result = await userRepository.findUser(username, email);

        if (result.length > 0) {
            throw new AuthError(500, "User already registered");
        }

        const {salt, hashPassword} = this.#hashPassword(password);

        const response = await userRepository.create({
            username,
            email,
            hashPassword,
            salt
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

        if (!this.#validatePassword(password, user.password, user.salt)) {
            throw new AuthError(401, "Wrong password, login failed!");
        }

        return generateToken(user.username);
    }

    #hashPassword(password) {
        try {
            const salt = crypto.randomBytes(32).toString('hex');
            const hashPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

            return {
                salt,
                hashPassword
            }
        } catch (err) {
            logger(err);
            throw new AuthError();
        }
    }

    #validatePassword(password, savedHash, salt) {
        try {
            const currentHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
            return currentHash === savedHash;
        } catch (err) {
            logger(err);
            throw new AuthError();
        }
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