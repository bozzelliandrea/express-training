import {BaseError} from "./base.error";
import {HttpCode} from "../common/http_code.enum";

export class AuthError extends BaseError {

    constructor(code: HttpCode, description: string) {
        super(AuthError.name, code, description);
    }
}