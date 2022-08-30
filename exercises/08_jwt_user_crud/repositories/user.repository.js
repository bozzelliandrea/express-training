const {Client: postgres} = require("pg");

class UserRepository {

    static #SELECT_USER_BY_USERNAME_AND_EMAIL = 'SELECT * FROM users WHERE username=$1 OR email=$2';
    static #SELECT_USER_BY_USERNAME = 'SELECT * FROM users WHERE username=$1';
    static #INSERT_USER = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3)';

    #client = undefined;

    constructor() {
        this.#client = new postgres({
            host: process.env.PG_HOST,
            port: process.env.PG_PORT,
            database: process.env.PG_DB_NAME,
            user: process.env.PG_USERNAME,
            password: process.env.PG_PASSWORD,
        });
        (async () => await this.#client.connect())();
        // register db connection end
        process.on('exit', async () => {
            console.log("DB Connection shutting down");
            await this.#client.end();
        })
    }

    async findUser(username, email) {
        let result;

        if (email)
            result = await this.#client.query(UserRepository.#SELECT_USER_BY_USERNAME_AND_EMAIL, [username, email]);
        else
            result = await this.#client.query(UserRepository.#SELECT_USER_BY_USERNAME, [username]);

        return result.rows;
    }

    async create(user) {
        try {
            await this.#client.query('BEGIN');
            const result = await this.#client.query(UserRepository.#INSERT_USER, Object.values(user));
            await this.#client.query('COMMIT');
            return result
        } catch (err) {
            await this.#client.query('ROLLBACK');
            console.error(err);
            throw err;
        }
    }
}

module.exports = new UserRepository();