import {BaseError} from "./base.error";
import {HttpCode} from "../common/http-code.enum";

export class AuthError extends BaseError {

    constructor(code: HttpCode, description: string) {
        super(AuthError.name, code, description);
    }
}