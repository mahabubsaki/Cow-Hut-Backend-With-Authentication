import express from 'express';
import { validateAuthLogin, validateChangePassword, validateRefreshToken } from './auth.middleware';
import { authLoginController, authTokenRequestController, changePasswordController } from './auth.controller';
import routeGuard from '../../middlewares/routeGuard';
import { USER_ROLE } from '../../enums/role.enums';
import { validateSignedUpUser } from '../users/user.middleware';
import { userSignUpController } from '../users/user.controller';


const authRouter = express.Router();

authRouter.post('/signup', validateSignedUpUser, userSignUpController);
authRouter.post('/login', validateAuthLogin, authLoginController);
authRouter.post('/refresh-token', validateRefreshToken, authTokenRequestController);
authRouter.post('/change-password', validateChangePassword, routeGuard(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER), changePasswordController);

export default authRouter;