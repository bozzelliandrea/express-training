import {Request, Response} from "express";

export default function (req: Request, res: Response) {
    res.setHeader('Content-Type', 'application/json');
    res.send({
        payload: res.locals._response,
        token: res.locals._token
    })
}