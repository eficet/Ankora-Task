import { PhoneNumber } from "../phoneNumber.class";
import { IsNotEmpty } from 'class-validator'
export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    surname: string;
    @IsNotEmpty()
    email: string;
    phoneNumbers: PhoneNumber[]
}