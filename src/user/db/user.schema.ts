import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: { type: String, unique: true },
    phoneNumbers: {
        type: [{ phoneType: String, value: String }], _id: false
    }
});