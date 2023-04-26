import { Timestamp } from "rxjs"

export class CreateUserDto {
    username: string
    password: string
    email_address: string
    date_of_birth: string
    telephone: string
}
