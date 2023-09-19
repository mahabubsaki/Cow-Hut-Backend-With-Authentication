import { RequestHandler } from "express";
import { OrderZodSchmea } from "./order.schema";
import { User } from "../users/user.model";
import { ApiError } from "../../shared/ApiError";
import httpStatus from "http-status";
import { Cow } from "../cows/cow.model";

export const validateSignedUpOrder: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await OrderZodSchmea.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};


export const validateIds: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        const buyer = await User.findById(req.body.buyer);
        const cow = await Cow.findById(req.body.cow);
        if (!cow) {
            throw new ApiError(httpStatus.BAD_REQUEST, "No Cow found with the given id");
        }
        if (!buyer) {
            throw new ApiError(httpStatus.BAD_REQUEST, "No User found with the given id");
        }
        if (buyer.role !== 'buyer') {
            throw new ApiError(httpStatus.BAD_REQUEST, "Only Buyers can buy cows from the hut");
        }
        if (cow.label !== 'for sale') {
            throw new ApiError(httpStatus.BAD_REQUEST, "You can't buy a cow which is not for sale");
        }
        next();
    }
    catch (err) {
        console.log(err, 'lol');
        next(err);
    }

};