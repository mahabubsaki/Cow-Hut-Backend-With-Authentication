import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IAdmin } from "./admin.interface";
import { adminSignUp, getSingleAdmin, updateAdmin } from "./admin.service";
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


export const adminProfileController = catchAsync(async (req: Request, res: Response) => {
    const id = req.user.id;
    const result = await getSingleAdmin(id);
    sendResponse<IAdmin | null>(res, {
        message: result ? `Admin's information retrieved successfully` : `No user found`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No user found with id ${id}`, path: "" }] : null
    });
});

export const updateAdminProfileController = catchAsync(async (req: Request, res: Response) => {
    const id = req.user.id;
    const body = req.body;
    const result = await updateAdmin(id, body);
    sendResponse<IAdmin | null>(res, {
        message: result ? `Admin Info update successfully` : `No user found to update`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No user found with id ${id}`, path: "" }] : null
    });
});




