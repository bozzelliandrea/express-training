import https from 'https';
import {PostgresDataSource} from "../db/postgres.datasource";
import {Photo} from "../db/entity/photo.entity";
import {Repository} from "typeorm/repository/Repository";
import {IncomingMessage} from "http";
import {BaseError} from "../error/base.error";
import {ExternalServiceError} from "../error/external_service.error";

export class PhotoService {

    private readonly _randomPhotoURL: string = 'https://picsum.photos/200';
    private readonly _repository: Repository<Photo>;

    constructor() {
        this._repository = PostgresDataSource.getRepository(Photo)
    }

    public async create(name: string, description: string): Promise<Photo> {
        const photo: Photo = new Photo();
        photo.name = name;
        photo.description = description;
        photo.url = await this.getPhotoURL();

        return await this._repository.save(photo);
    }

    public async findAll(): Promise<Photo[]> {
        let res;
        try {
            res = await this._repository.find();
        } catch (e) {
            throw new BaseError(e.name);
        }
        return res
    }

    private getPhotoURL(): Promise<string> {
        return new Promise<string>((resolve: Function, reject: Function) => {
            const req = https.get(this._randomPhotoURL, (res: IncomingMessage) => {
                resolve(res.headers["location"])
            }).on('error', (err: Error) => {
                reject(new ExternalServiceError("photo generator is not available"))
            });
            req.end();
        });

    }
}