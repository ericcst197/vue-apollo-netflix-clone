import { model, Schema } from "mongoose"

const userSchema = new Schema({
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
        // select: false
        // match: [/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password is invalid']
    },
    token: {
        type: String
    },
}, {
    timestamps: true
})

export default model('User', userSchema);