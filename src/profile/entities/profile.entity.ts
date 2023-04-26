import { Entity, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Profile {
    @PrimaryKey({
        autoincrement: true,
    })
    id!: number

    @Property()
    display_name!: string

    @Property()
    body!: string

    @Property()
    status!: string

    @OneToOne(() => User, user => user.profile, { owner: true })
    user!: User;
}
