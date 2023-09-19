import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { IAdmin } from "../admin/admin.interface";
import { authLogin, requestAccesToken } from "./auth.service";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import config from "../../config";

export const authLoginController = catchAsync(async (req: Request, res: Response) => {
    const userData: Pick<IAdmin, 'phoneNumber' | 'password'> = req.body;

    const { accessToken, refreshToken } = await authLogin(userData);
    res.cookie('refreshToken', refreshToken, { secure: config.env == 'production' ? true : false, httpOnly: true });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: { accessToken },
        message: "Logged in successfully"
    });
});


export const authTokenRequestController = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await requestAccesToken(refreshToken);
    res.cookie('refreshToken', refreshToken, { secure: config.env == 'production' ? true : false, httpOnly: true });
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "New access token generated successfully !"
    });
});
