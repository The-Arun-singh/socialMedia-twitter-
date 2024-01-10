import express from 'express';
import { authorization } from '../middlewares/authorization.js';
import { followUserHandler, getUserHandler, getUserTweetsHandler, unfollowUserHandler, updateUserDetailsHandler, uploadProfilePicHandler } from '../controllers/user_handlers.js';

const userRouter = express.Router();

// all the routes for  user data manipulation


userRouter.get('/api/user/:id', authorization, getUserHandler);

userRouter.put('/api/user/:id/follow', authorization, followUserHandler);
userRouter.put('/api/user/:id/unfollow', authorization, unfollowUserHandler);

userRouter.put('/api/user/update', authorization, updateUserDetailsHandler);
userRouter.put('/api/user/uploadProfilePic', authorization, uploadProfilePicHandler);

userRouter.get('/api/user/:id/tweets', authorization, getUserTweetsHandler);


export default userRouter; 