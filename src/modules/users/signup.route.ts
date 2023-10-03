import express from 'express';
import { validateSignedUpUser } from './user.middleware';
import { userSignUpController } from './user.controller';
const signUpRouter = express.Router();

signUpRouter.post('/auth/signup', validateSignedUpUser, userSignUpController);

export default signUpRouter;