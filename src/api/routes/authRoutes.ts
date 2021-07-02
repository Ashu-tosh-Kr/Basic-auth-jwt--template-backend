import { Router } from 'express';
import {  login_post, logout_get, signup_post } from '../controllers/authController';
const authRouter = Router();

authRouter.post('/signup', signup_post).post('/login', login_post).get('/logout',logout_get);

export default authRouter;
