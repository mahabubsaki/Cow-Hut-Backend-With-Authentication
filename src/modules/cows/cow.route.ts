import express from 'express';
import { validateSellerId, validateSignedUpCow, validateUpdatedCow } from './cow.middleware';
import { objectIdValidation } from '../../shared/objectIdValidation';
import { cowSignUpController, deleteCowController, getAllCowsController, getSingleCowController, updateCowController } from './cow.controller';

const cowRouter = express.Router();

cowRouter.post('/', validateSignedUpCow, validateSellerId, cowSignUpController);
cowRouter.get('/', getAllCowsController);
cowRouter.get('/:id', objectIdValidation, getSingleCowController);
cowRouter.patch('/:id', objectIdValidation, validateUpdatedCow, updateCowController);
cowRouter.delete('/:id', objectIdValidation, deleteCowController);
export default cowRouter;