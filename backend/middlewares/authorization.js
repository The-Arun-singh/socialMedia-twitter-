import 'dotenv/config.js'
import jwt from "jsonwebtoken";
import User from "../models/user_model.js";


// here are is the middlewares for the authorization of the user and route protection

export const authorization = async (req, res, next) => {
    try {
        const authorization = req.headers['authorization'];
        // console.log(req.headers)

        if (!authorization) return res.status(401).json({ error: 'Invalid authorization' });

        const token = authorization.split(' ')[1];
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: id
        });
        req.user = user;
        next();

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: 'jwt expired' });
    }
}

// export const checkAdminAuth = async (req, res, next) => {
//     try {
//         const userRole = req.user.role;
//         if (userRole === 'admin') {
//             next();
//         } else {
//             res.status(401).json({ error: "Invalid authorization" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error });
//     }
// };
// export const checkAuth = async (req, res, next) => {
//     try {
//         const userRole = req.user.role;
//         const id = req.params.id;
//         if (id === req.user.id) {
//             next();
//         } else if (userRole === 'admin') {
//             next();
//         } else {
//             res.status(401).json({ error: "Invalid authorization" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(400).json({ error: error });
//     }
// };