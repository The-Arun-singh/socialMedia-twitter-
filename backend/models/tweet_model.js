import mongoose from "mongoose";

// schema for the tweets

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    tweetedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    retweetedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    img: {
        type: String,
        required: true,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tweet",
        }
    ],
}, {
    timestamps: true
});

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
