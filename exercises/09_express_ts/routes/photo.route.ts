import {NextFunction, Request, Response, Router} from "express";
import {PhotoService} from "../services/photo.service";
import {Photo} from "../db/entity/photo.entity";

const router = Router();
const service = new PhotoService();

router.post('/', (req: Request, res: Response, next: NextFunction) => {
    service.create(req.body.name, req.body.description)
        .then((result: Photo) => res.send(result))
        .catch((err: string) => res.status(500).send({message: "Error"}));
})

export default router;
