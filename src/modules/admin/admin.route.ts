import express from 'express';
import { validateSignedUpAdmin } from './admin.middleware';
import { adminProfileController, adminSignUpController, updateAdminProfileController } from './admin.controller';
import routeGuard from '../../middlewares/routeGuard';
import { USER_ROLE } from '../../enums/role.enums';

const adminRouter = express.Router();

adminRouter.post('/create-admin', validateSignedUpAdmin, adminSignUpController);
adminRouter.get('/my-profile', routeGuard(USER_ROLE.ADMIN), adminProfileController);
adminRouter.patch('/my-profile', routeGuard(USER_ROLE.ADMIN), updateAdminProfileController);


export default adminRouter;