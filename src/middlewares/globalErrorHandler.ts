import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ApiError } from "../shared/ApiError";
import sendResponse, { IApiResponse } from "../shared/sendResponse";
import { Error } from "mongoose";
import { ZodError } from "zod";
import handleValidationError from "./handleValidationError";
import handleCastError from "./handleCastError";
import handleZodError from "./handleZodError";

const globalErrorHandler: ErrorRequestHandler = (err: ApiError, _: Request, res: Response, next: NextFunction) => {
    let reponse: IApiResponse<null> = {
        success: false,
        message: err?.message || "Something went wrong",
        statusCode: err.statusCode || 500,
        stack: err.stack,
        errorMessages: [{ message: err?.message || "Something went wrong", path: "unknown" }]
    };
    console.log({ err });
    if (err?.name === 'ValidationError' && err instanceof Error.ValidationError) {
        const simplifiedError = handleValidationError(err);
        reponse = { ...simplifiedError };
    }
    else if (err?.name === 'CastError' && err instanceof Error.CastError) {
        const simplifiedError = handleCastError(err);
        reponse = { ...simplifiedError };
    }
    else if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        reponse = { ...simplifiedError };
    }
    else if (err instanceof Error) {
        reponse = { ...reponse, message: err.message, errorMessages: err?.message ? [{ path: '', message: err?.message }] : [] };
    } else if (err instanceof ApiError) {
        reponse = { ...reponse, statusCode: err.statusCode, message: err.message, errorMessages: err?.message ? [{ path: '', message: err?.message }] : [] };
    }

    reponse.stack = err.stack;

    sendResponse(res, reponse);
    next();
};

export default globalErrorHandler;