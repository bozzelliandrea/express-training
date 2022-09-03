import {NextFunction, Request, Response, Router} from "express";
import {AuthService} from "../services/auth.service";

const router = Router();
const authService = new AuthService();

router.post('/register', (req: Request, res: Response, next: NextFunction) => {
    authService.register(req.body.username, req.body.email, req.body.password)
        .then(({user, token}) => {
            res.locals._response = user;
            res.locals._token = token;
            next();
        }).catch((err) => next(err));
})

router.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authService.login(req.body.username, req.body.password)
        .then(token => {
            res.locals._token = token;
            next();
        }).catch((err) => next(err));
})

router.get('/refresh', (req: Request, res: Response, next: NextFunction) => {
    authService.refresh(req.headers['authorization'])
        .then(token => {
            res.locals._token = token;
            next();
        }).catch((err) => next(err));
})

export default router;