import { Document } from 'mongoose';
import { PhoneNumber } from '../phoneNumber.class';
export interface User extends Document {
    _id?: string
    firstName: string;
    lastName: string;
    email: string
    phoneNumbers: PhoneNumber[];
}