import jwt from "jsonwebtoken";
import crypto from "crypto";

export function _generateToken(username: string): string {
    return jwt.sign(
        {username},
        process.env.TOKEN_SECRET,
        {
            expiresIn: process.env.TOKEN_VALIDITY + "s"
        })
}

export function _hashPassword(password: string): { salt: string, hash: string } {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

    return {
        salt,
        hash
    }
}

export function _validatePassword(password: string, hash: string, salt: string): boolean {
    const currentHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
    return currentHash === hash;
}