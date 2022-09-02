import {Request, Response} from "express";

export default function (req: Request, res: Response) {
    res.send({
        payload: res.locals._response,
        token: "newToken"
    })
}