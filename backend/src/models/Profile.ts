import { model, Schema } from "mongoose"

const profileSchema = new Schema({
    name: {
        type: String,
        index: true,
        trim: true,
    },
    image: {
        type: String,
        default: null,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
}, {
    timestamps: true
})

export default model('Profile', profileSchema);

