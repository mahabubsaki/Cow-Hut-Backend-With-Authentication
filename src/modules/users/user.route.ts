import express from 'express';
import { deleteUserController, getAllUsersController, getSingleUserController, userSignUpController, updateUserController, myProfileController, updateProfileController } from './user.controller';
import { validateSignedUpUser, validateUpdatedUser } from './user.middleware';
import { objectIdValidation } from '../../shared/objectIdValidation';
import routeGuard from '../../middlewares/routeGuard';
import { USER_ROLE } from '../../enums/role.enums';

const userRouter = express.Router();

userRouter.post('/auth/signup', validateSignedUpUser, userSignUpController);
userRouter.get('/', routeGuard(USER_ROLE.ADMIN), getAllUsersController);
userRouter.get('/my-profile', routeGuard(USER_ROLE.BUYER, USER_ROLE.SELLER), myProfileController);
userRouter.get('/:id', objectIdValidation, routeGuard(USER_ROLE.ADMIN), getSingleUserController);
userRouter.patch('/my-profile', routeGuard(USER_ROLE.BUYER, USER_ROLE.SELLER), updateProfileController);
userRouter.patch('/:id', objectIdValidation, validateUpdatedUser, routeGuard(USER_ROLE.ADMIN), updateUserController);
userRouter.delete('/:id', objectIdValidation, routeGuard(USER_ROLE.ADMIN), deleteUserController);
export default userRouter;