import express from 'express';
import { deleteUserController, getAllUsersController, getSingleUserController, userSignUpController, updateUserController } from './user.controller';
import { validateSignedUpUser, validateUpdatedUser } from './user.middleware';
import { objectIdValidation } from '../../shared/objectIdValidation';

const userRouter = express.Router();

userRouter.post('/auth/signup', validateSignedUpUser, userSignUpController);
userRouter.get('/', getAllUsersController);
userRouter.get('/:id', objectIdValidation, getSingleUserController);
userRouter.patch('/:id', objectIdValidation, validateUpdatedUser, updateUserController);
userRouter.delete('/:id', objectIdValidation, deleteUserController);
export default userRouter;