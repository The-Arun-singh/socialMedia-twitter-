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
    retweetOf: {
        type: mongoose.Schema.Types.ObjectId,
        ref: () => "Tweet",
    },
    img: {
        type: String,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: () => "Tweet",
        }
    ],
}, {
    timestamps: true
});

tweetSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.createdAt = doc.createdAt.toLocaleDateString();
        return ret;
    }
})

const Tweet = mongoose.model('Tweet', tweetSchema);

export default Tweet;
