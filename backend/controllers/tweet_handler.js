import Tweet from "../models/tweet_model.js";

export const createTweetHandler = async (req, res) => {
    try {
        const { content, img } = req.body;

        if (!content) return res.status(404).json({ message: 'please provide tweet' });

        const tweet = await Tweet.create({
            content: content,
            tweetedBy: req.user._id,
            img: img,
        })

        res.status(200).json({ message: 'successfully tweeted', tweet: tweet });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const tweetLikesHandler = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (tweet.likes.includes(req.user._id)) return res.status(400).json({ message: 'already liked' });

        await Tweet.findByIdAndUpdate(req.params.id, {
            $push: { likes: req.user._id },
        }, {
            new: true
        });

        res.status(200).json({ message: 'successfully liked the tweet', tweet: tweet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
export const tweetDislikesHandler = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (!tweet.likes.includes(req.user._id)) return res.status(400).json({ message: 'already disliked' });

        await Tweet.findByIdAndUpdate(req.params.id, {
            $pull: { likes: req.user._id },
        }, {
            new: true
        });

        res.status(200).json({ message: 'successfully disliked the tweet', tweet: tweet });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const tweetReplyHandler = async (req, res) => {
    try {
        const { content, img } = req.body;
        if (!content) return res.status(404).json({ message: 'please provide tweet' });

        const tweet = await Tweet.create({
            content: content,
            tweetedBy: req.user._id,
            img: img,
        })

        const reply = await Tweet.findByIdAndUpdate(req.params.id, {
            $push: { reply: tweet._id },
        }, {
            new: true
        });

        res.status(200).json({ message: 'successfully replied to the tweeted', reply: reply });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
export const retweetHandler = async (req, res) => {
    try {
        const tweet = await Tweet.findById(req.params.id);

        if (tweet.retweetedBy.includes(req.user._id)) return res.status(400).json({ message: 'already retweeted' });

        const retweet = await Tweet.findByIdAndUpdate(req.params.id, {
            $push: { retweetedBy: req.user._id },
        }, {
            new: true
        });

        res.status(200).json({ message: 'successfully retweeted', retweet });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const getTweetHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const tweet = await Tweet.findById(id)
            .populate({
                path: "tweetedBy",
                select: '-password',
            })
            .populate({
                path: "likes",
                select: '-password',
            })
            .populate({
                path: "retweetedBy",
                select: '-password',
            })
            .populate({
                path: "replies",
                select: '-password',
            })
            .exec();

        res.status(200).json({ message: 'User found', tweet: tweet });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
export const getAllTweetsHandler = async (req, res) => {
    try {
        const tweet = await Tweet.find()
            .populate({
                path: "tweetedBy",
                select: '-password',
            })
            .populate({
                path: "likes",
                select: '-password',
            })
            .populate({
                path: "retweetedBy",
                select: '-password',
            })
            .populate({
                path: "replies",
                select: '-password',
            })
            .sort({ createdAt: -1 })
            .exec();


        res.status(200).json({ message: 'User found', tweet: tweet });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const deleteTweetHandler = async (req, res) => {
    try {
        const tweet = await Tweet.findOneAndDelete({ _id: req.params.id, tweetedBy: req.user._id });

        if (!tweet) return res.status(404).json({ message: "tweet not found or not authorized to delete" });

        res.status(200).json({ message: "Successfully deleted the tweet" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};