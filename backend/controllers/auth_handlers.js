import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config.js'
import User from "../models/user_model.js";


// here are all the functional logic needed for the backend routes for users


export const signupHandler = async (req, res) => {
    try {
        const { name, userName, email, password } = req.body;

        if (!name || !userName || !email || !password) return res.status(400).json({ message: "One or more input field is missing" });

        const userExists = await User.findOne({
            email: email,
        })

        if (userExists) return res.status(500).json({ message: "User already exists" });

        const hashedpassword = await bcrypt.hash(password, 10);

        await User.create({
            name: name,
            userName: userName,
            email: email,
            password: hashedpassword,
        });

        res.status(200).json({ message: "User successfully signedUp" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const loginHandler = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({ message: "username or password is missing" });

        const user = await User.findOne({ email: email });

        if (!user) return res.status(401).json({ message: "Invalid Credentials" });

        const verified = await bcrypt.compare(password, user.password);

        if (!verified) return res.status(401).json({ message: "password is incorrect" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });


        res.status(200).json({
            user: {
                id: user._id,
                name: user.name,
                userName: user.userName,
                email: user.email,
                profilePic: user.profilePic,
                location: user.location,
                dob: user.dob,
                followers: user.followers,
                following: user.following,
            },
            token: token,
            message: "User successfully logedIn"
        });


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};
