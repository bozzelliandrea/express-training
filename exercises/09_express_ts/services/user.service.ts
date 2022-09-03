import {Repository} from "typeorm/repository/Repository";
import {User} from "../db/entity/user.entity";
import {PostgresDataSource} from "../db/postgres.datasource";
import {BaseError} from "../error/base.error";
import {HttpCode} from "../common/http-code.enum";
import {DeleteResult} from "typeorm/query-builder/result/DeleteResult";
import {_hashPassword} from "../common/auth.utils";

export class UserService {

    private readonly _userRepository: Repository<User>;

    constructor() {
        this._userRepository = PostgresDataSource.getRepository(User);
    }

    public async getAll(): Promise<User[]> {
        return await this._userRepository.find().then(users => {
            return users.map((u: User) => {
                return {
                    username: u.username,
                    email: u.email,
                    id: u.id,
                } as User
            })
        })
    }

    public async getById(id: string): Promise<User> {
        if (!id) {
            throw new BaseError(null, HttpCode.BAD_REQUEST, "user id must have a value");
        }

        const user: User = await this._userRepository.findOneBy({id: Number(id)});

        return {
            username: user.username,
            email: user.email,
            id: user.id,
        } as User
    }

    public async delete(id: string): Promise<boolean> {
        if (!id) {
            throw new BaseError(null, HttpCode.BAD_REQUEST, "user id must have a value");
        }

        const result: DeleteResult = await this._userRepository.delete(Number(id));

        return result.affected === 1;
    }

    public async update(id: string, email: string, password: string): Promise<User> {
        if (!id) {
            throw new BaseError(null, HttpCode.BAD_REQUEST, "user id must have a value");
        }

        if (email && password) {
            throw new BaseError(null, HttpCode.BAD_REQUEST, "email or password cannot be empty");
        }

        let user: User = await this._userRepository.findOneBy({id: Number(id)});

        if (email)
            user.email = email;

        if (password) {
            const {salt, hash} = _hashPassword(password);
            user.password = hash;
            user.salt = salt;
        }

        user = await this._userRepository.save(user);

        return {
            username: user.username,
            email: user.email,
            id: user.id,
        } as User
    }
}