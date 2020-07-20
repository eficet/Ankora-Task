import { PhoneNumber } from "../phoneNumber.class";
import { IsNotEmpty } from 'class-validator'
export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;
    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty()
    email: string;
    phoneNumbers: PhoneNumber[]
}