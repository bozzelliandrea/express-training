import {NextFunction, Request, Response, Router} from "express";
import {UserService} from "../services/user.service";
import authVerifyMiddleware from "../middleware/auth-verify.middleware";

const router = Router();
const userService = new UserService();

router.use(authVerifyMiddleware);

router.route('/')
    .get((req: Request, res: Response, next: NextFunction) => {
        userService.getAll().then(result => {
            res.locals._response = result;
            next()
        }).catch(err => next(err))
    });

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
        userService.update(req.params.id, req.body.email, req.body.password)
            .then(result => {
                res.locals._response = result;
                next()
            })
            .catch(err => next(err))
    })
    .delete((req: Request, res: Response, next: NextFunction) => {
        userService.delete(req.params.id).then(() => next()).catch(err => next(err))
    });

export default router;