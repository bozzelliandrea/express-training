import {NextFunction, Request, Response} from 'express';
import jwt from "jsonwebtoken";

export default function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
        console.error("No token found")
        res.sendStatus(401);
    }

    jwt.verify(token, process.env.TOKEN_SECRET, {}, (err, decoded) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }

        console.debug("Authentication found for user ", decoded)
        res.locals._whoami = decoded;
        next();
    })
}