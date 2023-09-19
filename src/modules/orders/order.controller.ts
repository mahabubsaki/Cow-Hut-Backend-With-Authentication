import httpStatus from "http-status";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { IOrder } from "./order.interface";
import { getAllOrders, getSingleOrder, orderSignUp } from "./order.service";
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

export const getAllOrdersController = catchAsync(async (req: Request, res: Response) => {
    const query = req.user.role === 'seller' ? { seller: req.user.id } : { buyer: req.user.id };
    const result = await getAllOrders(query);
    sendResponse<IOrder[]>(res, {
        message: "Orders retrieved successfully",
        statusCode: httpStatus.OK,
        success: true,
        data: result,
    });
});
export const getSingleOrdersController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleOrder(id, req.user);
    sendResponse<IOrder | null>(res, {
        message: result ? "Order information retrieved successfully" : "No order found with given id",
        statusCode: httpStatus.OK,
        success: true,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No order found with id ${id}`, path: "" }] : null
    });
});