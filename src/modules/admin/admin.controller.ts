import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import { adminSignUp } from "./admin.service";
import httpStatus from "http-status";


export const adminSignUpController = catchAsync(async (req: Request, res: Response) => {
    const userData: IAdmin = req.body;
    const result = await adminSignUp(userData);

    sendResponse<Partial<IAdmin>>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Admin created successfully"
    });
});




