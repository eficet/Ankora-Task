import * as mongoose from 'mongoose';
export const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phoneNumbers: {
        type: [
            {
                phoneType: {
                    type: String,
                    enum: ['PRIMARY', 'SECONDARY'],
                    default: 'PRIMARY'
                },
                value: String,
            },
        ],
        _id: false,
    },
});
