import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IOrder } from "./order.interface";
import { getAllOrders, orderSignUp } from "./order.service";
import { Request, Response } from "express";

export const orderSignUpController = catchAsync(async (req: Request, res: Response) => {
    const orderData: IOrder = req.body;
    const result = await orderSignUp(orderData);
    sendResponse<IOrder>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Order created successfully"
    });
});

export const getAllOrdersController = catchAsync(async (_: Request, res: Response) => {
    const result = await getAllOrders();
    sendResponse<IOrder[]>(res, {
        message: "Orders retrieved successfully",
        statusCode: httpStatus.OK,
        success: true,
        data: result,
    });
});