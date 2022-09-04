import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public username: string;

    @Column()
    public email: string;

    @Column({nullable: true})
    public password: string;

    @Column({nullable: true})
    public salt: string;

    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }

}