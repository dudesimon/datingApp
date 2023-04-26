import { Collection, DateTimeType, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity"

@Entity()
export class Message {
    @PrimaryKey({
        autoincrement: true,
    })
    id!: number

    @Property()
    message!: string

    //Something wrong with the ManyToOne connecting to user.
    @ManyToOne(() => User)
    sender!: User;

    @ManyToOne(() => User)
    receiver!: User;
}
