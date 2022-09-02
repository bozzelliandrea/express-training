import {NextFunction, Request, Response} from "express";
import {BaseError} from "../error/base.error";

export default function (err: BaseError, req: Request, res: Response, next: NextFunction) {
    res.status(err.code).send({
        name: err.name,
        code: err.code,
        description: err.description,
    });
}