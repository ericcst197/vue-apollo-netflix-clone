import { model, Schema, Document } from "mongoose"

export interface IProfile extends Document {
    name: string,
    image?: string,
    userId?: string,
}

const profileSchema = new Schema<IProfile>({
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

