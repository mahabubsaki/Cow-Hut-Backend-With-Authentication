import express from 'express';
import { validateIds, validateSignedUpOrder } from './order.middleware';
import { getAllOrdersController, orderSignUpController } from './order.controller';
const orderRouter = express.Router();

orderRouter.post('/', validateSignedUpOrder, validateIds, orderSignUpController);
orderRouter.get('/', getAllOrdersController);

export default orderRouter;