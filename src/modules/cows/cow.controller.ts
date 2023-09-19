import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import httpStatus from "http-status";
import { ICow } from "./cow.interface";
import { cowSignUp, deleteCow, getAllCows, getSingleCow, updateCow } from "./cow.service";
import { ICowFilterOptions, ICowPaginationOptions } from "./cow.query";
import pick from "../../utilities/pick";

export const cowSignUpController = catchAsync(async (req: Request, res: Response) => {
    const userData: ICow = req.body;
    const result = await cowSignUp(userData);
    sendResponse<ICow>(res, {
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        message: "Cow created successfully"
    });
});

export const getAllCowsController = catchAsync(async (req: Request, res: Response) => {

    const paginationOptions: ICowPaginationOptions = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
    const filterOptions: ICowFilterOptions = pick(req.query, ['query', 'minPrice', 'maxPrice', 'location', 'category', 'breed', 'name', 'label']);
    const { data: result, meta } = await getAllCows(paginationOptions, filterOptions);
    sendResponse<ICow[]>(res, {
        message: "Cows retrieved successfully",
        statusCode: httpStatus.OK,
        success: true,
        data: result,
        meta
    });
});

export const getSingleCowController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await getSingleCow(id);
    sendResponse<ICow | null>(res, {
        message: result ? `Cow retrieved successfully with id ${id}` : `No cow found with id ${id}`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No cow found with id ${id}`, path: "" }] : null
    });
});


export const updateCowController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const body = req.body;
    const result = await updateCow(id, body);
    sendResponse<ICow | null>(res, {
        message: result ? `Cow updated successfully withs id ${id}` : `No cow found with id ${id}`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No cow found with id ${id}`, path: "" }] : null
    });
});

export const deleteCowController = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await deleteCow(id);
    sendResponse(res, {
        message: result ? `Cow deleted successfully with id ${id}` : `No cow found with id ${id}`,
        statusCode: result ? httpStatus.OK : httpStatus.BAD_REQUEST,
        success: result ? true : false,
        data: result ? result : null,
        errorMessages: !result ? [{ message: `No cow found with id ${id}`, path: "" }] : null
    });
});