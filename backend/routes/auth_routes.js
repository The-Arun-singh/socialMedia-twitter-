import express from 'express';
import { loginHandler, signupHandler } from '../controllers/auth_handlers';

const userRouter = express.Router();

// all the routes for user authentication and user data manipulation

userRouter.post("/api/auth/register", signupHandler);
userRouter.post("/api/auth/login", loginHandler);



export default userRouter; 