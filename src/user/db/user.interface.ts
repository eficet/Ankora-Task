import { Document } from 'mongoose';
import { PhoneNumber } from '../phoneNumber.class';
export interface User extends Document {
    _id?: string
    name: string;
    surname: string;
    email: string
    phoneNumbers: PhoneNumber[];
}