import express from 'express';
import { validateCowOwner, validateSellerId, validateSignedUpCow, validateUpdatedCow } from './cow.middleware';
import { objectIdValidation } from '../../shared/objectIdValidation';
import { cowSignUpController, deleteCowController, getAllCowsController, getSingleCowController, updateCowController } from './cow.controller';
import routeGuard from '../../middlewares/routeGuard';
import { USER_ROLE } from '../../enums/role.enums';

const cowRouter = express.Router();

cowRouter.post('/', validateSignedUpCow, validateSellerId, routeGuard(USER_ROLE.SELLER), cowSignUpController);
cowRouter.get('/', validateSellerId, routeGuard(USER_ROLE.SELLER, USER_ROLE.ADMIN, USER_ROLE.BUYER), getAllCowsController);
cowRouter.get('/:id', objectIdValidation, routeGuard(USER_ROLE.SELLER, USER_ROLE.ADMIN, USER_ROLE.BUYER), getSingleCowController);
cowRouter.patch('/:id', objectIdValidation, validateUpdatedCow, routeGuard(USER_ROLE.SELLER), validateCowOwner, updateCowController);
cowRouter.delete('/:id', objectIdValidation, validateCowOwner, deleteCowController);
export default cowRouter;