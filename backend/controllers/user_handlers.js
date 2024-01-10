import Tweet from '../models/tweet_model.js';
import User from '../models/user_model.js';

// here are all the request handlers for the user model and user routes
export const getUserHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id)
            .select('-password')
            .exec();

        res.status(200).json({ message: 'User found', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const followUserHandler = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const loggedInUserId = req.user._id;
        // checking if user is trying to follow its own account.
        if (loggedInUserId === targetUserId) throw new Error("User cannot be followed");

        const loggedInUser = await User.findById(loggedInUserId);
        // checking if user is  already being followed
        if (loggedInUser.following.includes(targetUserId)) {
            throw new Error("User is already being followed");
        }

        loggedInUser.following.push(targetUserId);
        await loggedInUser.save();

        const targetUser = await User.findById(targetUserId);
        //  checking if user is already following 
        if (targetUser.followers.includes(loggedInUserId)) {
            throw new Error("User is already following");
        }

        targetUser.followers.push(loggedInUserId);
        await targetUser.save();

        res.status(200).json({ message: 'successfully following user', loggedInUser: loggedInUser, targetUser: targetUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
export const unfollowUserHandler = async (req, res) => {
    try {
        const targetUserId = req.params.id;
        const loggedInUserId = req.user._id;

        if (loggedInUserId === targetUserId) throw new Error("User cannot be unfollowed");

        const loggedInUser = await User.findById(loggedInUserId);

        if (!loggedInUser.following.includes(targetUserId)) {
            throw new Error("User is not being followed");
        }

        loggedInUser.following.pull(targetUserId);
        await loggedInUser.save();

        const targetUser = await User.findById(targetUserId);

        if (!targetUser.followers.includes(loggedInUserId)) {
            throw new Error("User is not following");
        }

        targetUser.followers.pull(loggedInUserId);
        await targetUser.save();

        res.status(200).json({ message: 'Successfully unfollowed user', loggedInUser: loggedInUser, targetUser: targetUser });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const updateUserDetailsHandler = async (req, res) => {
    try {
        const { name, location, dob } = req.body;
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                name: name,
                location: location,
                dob: dob,
            }
        }, {
            new: true
        }).select('-passwords')
            .exec();

        res.status(200).json({ message: 'User updated successfully', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const getUserTweetsHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const userTweets = await Tweet.find({ tweetedBy: id })
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

        res.status(200).json({ message: 'successfully found tweets', allTweets: userTweets });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const uploadProfilePicHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set: {
                profilePic: req.body.profilePic,
            }
        }).select('-password')
            .exec();

        res.status(200).json({ message: 'successfully uploaded Profile pic', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
