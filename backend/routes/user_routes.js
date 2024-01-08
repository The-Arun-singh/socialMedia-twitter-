import express from 'express';
import { authorization } from '../middlewares/authorization';
import { followUserHandler, getUserHandler, getUserTweetsHandler, unfollowUserHandler, updateUserDetailsHandler } from '../controllers/user_handlers';

const userRouter = express.Router();

// all the routes for user authentication and user data manipulation


userRouter.get('/api/user/:id', getUserHandler);

userRouter.put('/api/user/:id/follow', authorization, followUserHandler);
userRouter.put('/api/user/:id/unfollow', authorization, unfollowUserHandler);
userRouter.put('/api/user/update', authorization, updateUserDetailsHandler);

userRouter.get('/api/user/:id/tweets', getUserTweetsHandler);

userRouter.put('/api/user/uploadProfilePic', authorization,);

export default userRouter; 