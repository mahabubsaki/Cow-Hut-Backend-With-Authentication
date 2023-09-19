import express from 'express';
import { validateSignedUpAdmin } from './admin.middleware';
import { adminSignUpController } from './admin.controller';

const adminRouter = express.Router();

adminRouter.post('/create-admin', validateSignedUpAdmin, adminSignUpController);


export default adminRouter;