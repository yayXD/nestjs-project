import {Column, Entity, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.entity";

@Entity({ name: "roles" })
export class Role {
    @ApiProperty({ example: "1", description: "Index" })
    @PrimaryGeneratedColumn( { type: "integer" })
    id: number;

    @ApiProperty({ example: "admin", description: "Users role" })
    @Column({ type: "varchar", length: 255, unique: true, nullable: false })
    value: string;

    @ApiProperty({ example: "Administrator", description: "Role description" })
    @Column({ type: "varchar", length: 255, nullable: false })
    description: string;

    @ManyToMany(() => User, (user: User) => user.roles)
    users: User[];

}