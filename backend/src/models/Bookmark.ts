import { model, Schema } from "mongoose"

const bookmarkSchema = new Schema({
    movieId: {
        type: String,
        required: [true, "Movie ID can't be blank"],
    },
    profileId: {
        type: Schema.Types.ObjectId,
        ref: 'Profile',
        required: [true, "Profile ID can't be blank"],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "User ID can't be blank"],
    },
}, {
    timestamps: true
})

export default model('Bookmark', bookmarkSchema);

