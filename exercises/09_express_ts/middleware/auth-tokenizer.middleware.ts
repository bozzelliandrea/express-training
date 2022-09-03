import {NextFunction, Request, Response} from "express";
import {_generateToken} from "../common/auth.utils";

export default function (req: Request, res: Response, next: NextFunction) {
    if (!res.locals._whoami) {
        next();
    }

    res.locals._token = _generateToken(res.locals._whoami);
    next();
}