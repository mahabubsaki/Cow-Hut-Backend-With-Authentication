import { RequestHandler } from "express";
import { Types } from "mongoose";
import { ApiError } from "./ApiError";
import httpStatus from "http-status";

export const objectIdValidation: RequestHandler = async (req, _, next): Promise<void> => {
    if (!Types.ObjectId.isValid(req.params.id)) {
        const err = new ApiError(httpStatus.BAD_REQUEST, "Invalid ObjectID Given");
        next(err);
        return;
    }
    next();
};
