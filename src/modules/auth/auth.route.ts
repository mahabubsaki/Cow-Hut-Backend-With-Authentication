import express from 'express';
import { validateAuthLogin, validateRefreshToken } from './auth.middleware';
import { authLoginController, authTokenRequestController } from './auth.controller';


const authRouter = express.Router();


authRouter.post('/login', validateAuthLogin, authLoginController);
authRouter.post('/refresh-token', validateRefreshToken, authTokenRequestController);

export default authRouter;