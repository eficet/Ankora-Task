import { PhoneNumber } from "../db/phoneNumber.interface";
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