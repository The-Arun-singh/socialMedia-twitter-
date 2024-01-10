import mongoose from "mongoose";

// schema for the user

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    location: {
        type: String,
    },
    dob: {
        type: String,
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: () => "User",
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: () => "User",
        }
    ],
    role: {
        type: String,
        required: true,
        default: 'user',
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;