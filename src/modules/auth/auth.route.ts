import express from 'express';
import { validateAuthLogin, validateChangePassword, validateRefreshToken } from './auth.middleware';
import { authLoginController, authTokenRequestController, changePasswordController } from './auth.controller';
import routeGuard from '../../middlewares/routeGuard';
import { USER_ROLE } from '../../enums/role.enums';


const authRouter = express.Router();


authRouter.post('/login', validateAuthLogin, authLoginController);
authRouter.post('/refresh-token', validateRefreshToken, authTokenRequestController);
authRouter.post('/change-password', validateChangePassword, routeGuard(USER_ROLE.ADMIN, USER_ROLE.BUYER, USER_ROLE.SELLER), changePasswordController);

export default authRouter;