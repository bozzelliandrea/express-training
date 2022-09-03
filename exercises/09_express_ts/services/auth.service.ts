import jwt, {JwtPayload} from 'jsonwebtoken';
import {Repository} from "typeorm/repository/Repository";
import {User} from "../db/entity/user.entity";
import {PostgresDataSource} from "../db/postgres.datasource";
import {AuthError} from "../error/auth.error";
import {HttpCode} from "../common/http_code.enum";
import crypto from "crypto";

export class AuthService {

    private readonly _userRepository: Repository<User>;

    constructor() {
        this._userRepository = PostgresDataSource.getRepository(User);
    }

    public async register(username: string, email: string, password: string): Promise<{ user: User, token: string }> {
        let user: User = await this._userRepository.findOneBy([
            {username},
            {email}
        ]);

        if (user) {
            throw new AuthError(HttpCode.BAD_REQUEST,
                `${user.username === username ? "username:" + username : ""} ${user.email === email ? "email:" + email : ""} already taken`)
        }
        const {salt, hash} = this._hashPassword(password);

        user = await this._userRepository.save(new User(null, username, email, hash, salt));

        if (user) {
            return {
                user: {username: user.username, email: user.email, id: user.id} as User,
                token: this._generateToken(username)
            };
        } else {
            throw new AuthError(HttpCode.INTERNAL_SERVER, "error registering new user");
        }
    }

    public async login(username: string, password: string): Promise<string> {
        const user: User = await this._userRepository.findOneBy({username});

        if (!user) {
            throw new AuthError(HttpCode.NOT_FOUND, "user not found");
        }

        if (!this._validatePassword(password, user.password, user.salt)) {
            throw new AuthError(HttpCode.UNAUTHORIZED, "wrong password");
        }

        return this._generateToken(username);
    }

    public async refresh(token: string): Promise<string> {
        if (!token) {
            throw new AuthError(HttpCode.BAD_REQUEST, "token is null");
        }

        const decodedPayload: JwtPayload = jwt.decode(token) as JwtPayload

        if (!await this._userRepository.findOneBy({username: decodedPayload.username})) {
            throw new AuthError(HttpCode.UNAUTHORIZED, "the user does not exist")
        }

        return this._generateToken(decodedPayload.username);
    }

    private _generateToken(username: string): string {
        return jwt.sign(
            {username},
            process.env.TOKEN_SECRET,
            {
                expiresIn: process.env.TOKEN_VALIDITY + "s"
            })
    }

    private _hashPassword(password: string): { salt: string, hash: string } {
        const salt = crypto.randomBytes(32).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

        return {
            salt,
            hash
        }
    }

    private _validatePassword(password: string, hash: string, salt: string): boolean {
        const currentHash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return currentHash === hash;
    }
}