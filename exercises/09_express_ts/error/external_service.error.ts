import {BaseError} from "./base.error";
import {HttpCode} from "../common/http_code.enum";

export class ExternalServiceError extends BaseError {

    constructor(description: string) {
        super(ExternalServiceError.name, HttpCode.SERVICE_UNAVAILABLE, description);
    }
}