import { model, Schema, Document } from "mongoose"

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    image: string;
    createdAt: Date;
    updatedAt: Date | undefined;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Username can't be blank"],
        match: [/^[a-zA-Z0-9]+$/, 'Please enter a valid username.'],
        index: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email can't be blank"],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Please enter a valid email address.'],
        index: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"],
        match: [/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password is invalid']
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
})

export default model('User', userSchema);