class AuthError extends Error {

    constructor(code, message) {
        super();

        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message || 'Internal Server Error';
        this.code = code || 500;
    }
}

module.exports = AuthError;