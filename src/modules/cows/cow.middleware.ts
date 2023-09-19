import { RequestHandler } from "express";
import { CowZodSchmea } from "./cow.schema";
import { User } from "../users/user.model";
import { ApiError } from "../../shared/ApiError";
import httpStatus from "http-status";


export const validateSignedUpCow: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await CowZodSchmea.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};

export const validateUpdatedCow: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await CowZodSchmea.omit({ seller: true }).partial().strict().parseAsync(req.body);
        next();
    }
    catch (err) {
        console.log(err);
        next(err);
    }

};

export const validateSellerId: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        const seller = await User.findById(req.body.seller);
        if (!seller) {
            throw new ApiError(httpStatus.BAD_REQUEST, "No User found with the given id");
        }
        if (seller.role !== 'seller') {
            throw new ApiError(httpStatus.BAD_REQUEST, "Only Sellers can add cows to the hut");
        }
        next();
    }
    catch (err) {
        console.log(err, 'lol');
        next(err);
    }

};

export const validateCowOwner: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        if (req.user.id !== req.params.id) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "You are not the owner of cow");
        }
        next();
    }
    catch (err) {
        console.log(err, 'lol');
        next(err);
    }

};
