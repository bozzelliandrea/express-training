import {NextFunction, Request, Response, Router} from "express";
import {UserService} from "../services/user.service";

const router = Router();
const userService = new UserService();

router.route('/')
    .get((req: Request, res: Response, next: NextFunction) => {
    })

router.route('/:id')
    .get((req: Request, res: Response, next: NextFunction) => {
        userService.getById(req.params.id)
            .then(result => {
                res.locals._response = result;
                next()
            })
            .catch(err => next(err))
    })
    .put((req: Request, res: Response, next: NextFunction) => {
    })
    .delete((req: Request, res: Response, next: NextFunction) => {
    })

export default router;