import express from 'express';
import { validateIds, validateSignedUpOrder } from './order.middleware';
import { getAllOrdersController, orderSignUpController } from './order.controller';
import routeGuard from '../../middlewares/routeGuard';
import { USER_ROLE } from '../../enums/role.enums';
const orderRouter = express.Router();

orderRouter.post('/', validateSignedUpOrder, validateIds, routeGuard(USER_ROLE.SELLER), orderSignUpController);
orderRouter.get('/', routeGuard(USER_ROLE.BUYER, USER_ROLE.SELLER), getAllOrdersController);

export default orderRouter;