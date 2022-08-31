import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Photo {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    url: string;

    @Column()
    views: number = 0;
}