import {HttpCode} from "../common/http-code.enum";

export class BaseError extends Error {

    public readonly name: string;
    public readonly code: number
    public readonly description: string;

    constructor(name: string, code?: HttpCode, description?: string) {
        super(description);
        Error.captureStackTrace(this);

        this.name = name || Error.name;
        this.code = code || HttpCode.INTERNAL_SERVER;
        this.description = description || HttpCode[HttpCode.INTERNAL_SERVER];
    }
}