import express from 'express';
import { validateIds, validateSignedUpOrder } from './order.middleware';
import { getAllOrdersController, getSingleOrdersController, orderSignUpController } from './order.controller';
import routeGuard from '../../middlewares/routeGuard';
import { USER_ROLE } from '../../enums/role.enums';
import { objectIdValidation } from '../../shared/objectIdValidation';
const orderRouter = express.Router();

orderRouter.post('/', validateSignedUpOrder, validateIds, routeGuard(USER_ROLE.SELLER), orderSignUpController);
orderRouter.get('/', routeGuard(USER_ROLE.BUYER, USER_ROLE.SELLER), getAllOrdersController);
orderRouter.get('/:id', objectIdValidation, routeGuard(USER_ROLE.BUYER, USER_ROLE.SELLER), getSingleOrdersController);

export default orderRouter;