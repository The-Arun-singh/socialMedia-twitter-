import User from '../models/user_model.js';

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
        const loggedInUserId = req.user._id;
        const targetUserId = req.params.id;

        if (loggedInUserId === targetUserId) throw new Error("User cannot be followed");

        const loggedInUser = await User.findById(loggedInUserId);

        if (loggedInUser.following.includes(targetUserId)) {
            throw new Error("User is already being followed");
        }

        await User.findByIdAndUpdate(loggedInUserId, {
            $push: {
                following: targetUserId,
            }
        }, {
            new: true
        })

        const targetUser = await User.findById(targetUserId);

        if (targetUser.followers.includes(loggedInUserId)) {
            throw new Error("User is already following");
        }

        await User.findByIdAndUpdate(targetUserId, {
            $push: {
                followers: loggedInUserId
            }
        }, {
            new: true
        });

        res.status(200).json({ message: 'successfully following user', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
export const unfollowUserHandler = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const targetUserId = req.params.id;

        if (loggedInUserId === targetUserId) throw new Error("User cannot be unfollowed");

        const loggedInUser = await User.findById(loggedInUserId);

        if (!loggedInUser.following.includes(targetUserId)) {
            throw new Error("User is already being unfollowed");
        }

        await User.findByIdAndUpdate(loggedInUserId, {
            $pull: {
                following: targetUserId,
            }
        }, {
            new: true
        });

        const targetUser = await User.findById(targetUserId);

        if (!targetUser.followers.includes(loggedInUserId)) {
            throw new Error("User is already unfollowed");
        }

        await User.findByIdAndUpdate(targetUserId, {
            $pull: {
                followers: loggedInUserId
            }
        }, {
            new: true
        });

        res.status(200).json({ message: 'successfully following user', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


export const updateUserDetailsHandler = async (req, res) => {
    try {
        const { name, location, dob } = req.body;
        const id = req.params.id;
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                name: name,
                location: location,
                dob: dob,
            }
        }, {
            new: true
        }).select('-password')
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
        const user = await User.findById(id)
            .select('-password')
            .exec();

        res.status(200).json({ message: 'successfully found tweets', user: user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};