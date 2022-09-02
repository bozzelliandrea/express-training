import {NextFunction, Request, Response, Router} from "express";
import {PhotoService} from "../services/photo.service";
import {Photo} from "../db/entity/photo.entity";

const router = Router();
const service = new PhotoService();

router.route('/')
    .post((req: Request, res: Response, next: NextFunction) => {
        service.create(req.body.name, req.body.description)
            .then((result: Photo) => {
                res.locals.response = result;
                next();
            })
            .catch((err: Error) => next(err))
    })
    .get((req: Request, res: Response, next: NextFunction) => {
        service.findAll()
            .then((result: Photo[]) => {
                res.locals._response = result;
                next();
            })
            .catch((err: Error) => next(err))
    })

export default router;
