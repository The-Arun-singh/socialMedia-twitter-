import express from 'express';
import { loginHandler, signupHandler } from '../controllers/auth_handlers.js';

const authRouter = express.Router();

// all the routes for user authentication 

authRouter.post("/api/auth/register", signupHandler);
authRouter.post("/api/auth/login", loginHandler);



export default authRouter; 