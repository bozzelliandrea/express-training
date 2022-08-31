import https from 'https';
import {PostgresDataSource} from "../db/postgres.datasource";
import {Photo} from "../db/entity/photo.entity";
import {Repository} from "typeorm/repository/Repository";
import {IncomingMessage} from "http";

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

    private getPhotoURL(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const req = https.get(this._randomPhotoURL, (res: IncomingMessage) => {
                resolve(res.headers["location"])
            });
            req.end();
        });

    }
}