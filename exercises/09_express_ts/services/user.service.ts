import {Repository} from "typeorm/repository/Repository";
import {User} from "../db/entity/user.entity";
import {PostgresDataSource} from "../db/postgres.datasource";
import {BaseError} from "../error/base.error";
import {HttpCode} from "../common/http_code.enum";

export class UserService {

    private readonly _userRepository: Repository<User>;

    constructor() {
        this._userRepository = PostgresDataSource.getRepository(User);
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
}