import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { deleteUser, getAllUsers, getSingleUser, userSignUp, updateUser } from "./user.service";
import { IUser } from "./user.interface";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";

export const userSignUpController = catchAsync(async (req: Request, res: Response) => {
    const userData: IUser = req.body;
    const result = await userSignUp(userData);
    sendResponse<IUser>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "User created successfully"
    });
});

export const getAllUsersController = catchAsync(async (_: Request, res: Response) => {
    const result = await getAllUsers();
    sendResponse<IUser[]>(res, {
        message: "Users retrieved successfully",
        statusCode: httpStatus.OK,
        success: true,
        data: result,
    });
});

export const getSingleUserController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleUser(id);
    sendResponse<IUser | null>(res, {
        message: result ? `User retrieved successfully with id ${id}` : `No user found with id ${id}`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No user found with id ${id}`, path: "" }] : null
    });
});


export const updateUserController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const result = await updateUser(id, body);
    sendResponse<IUser | null>(res, {
        message: result ? `User updated successfully with id ${id}` : `No user found with id ${id}`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No user found with id ${id}`, path: "" }] : null
    });
});

export const deleteUserController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await deleteUser(id);
    sendResponse(res, {
        message: result ? `User deleted successfully with id ${id}` : `No user found with id ${id}`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No user found with id ${id}`, path: "" }] : null
    });
});