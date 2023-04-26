import { Collection, DateTimeType, Entity, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { CreateUserDto } from "../dto/create-user.dto";
import { Message } from "../../messages/entities/message.entity";
import { Profile } from "../../profile/entities/profile.entity";
import { randomBytes } from "crypto";

@Entity()
export class User {
    constructor(createUserDto: CreateUserDto) {
        this.username = createUserDto.username
        this.password = createUserDto.password
        this.email_address = createUserDto.email_address
        this.date_of_birth = createUserDto.date_of_birth
        this.telephone = createUserDto.telephone
    }
    @PrimaryKey({
        autoincrement: true,
    })
    id: number

    @Property({
        length: 128
    })
    username!: string

    @Property({
        length: 128
    })
    apiKey: string = randomBytes(64).toString('ascii')

    @Property({
        length: 128
    })
    password!: string

    @Property({
        length: 256
    })
    email_address!: string

    @Property({
        length: 64
    })
    date_of_birth!: string

    @Property({
        length: 64
    })
    telephone!: string

    // This creates the joint table relation of following and being followed by a user
    @ManyToMany({
        entity: () => User,
        mappedBy: user => user.followers
    })
    following = new Collection<User>(this)

    @ManyToMany({
        entity: () => User,
        inversedBy: user => user.following
    })
    followers = new Collection<User>(this)

    //For some reason the OneToMany connecting messages doesnt seem to work
    //Error: Cannot find module 'src/users/entities/user.entity' when try to schema build
    //*Fixed*//
    @OneToMany(() => Message, messages => messages.sender)
    sender_messages = new Collection<Message>(this)

    @OneToMany(() => Message, messages => messages.receiver)
    receiver_messages = new Collection<Message>(this)

    @OneToOne(() => Profile, profile => profile.user)
    profile!: Profile;
}
