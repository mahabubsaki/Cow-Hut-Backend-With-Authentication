import { RequestHandler } from "express";
import { UpdatedZodSchema, UserZodSchema } from "./user.schema";

export const validateSignedUpUser: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await UserZodSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};
export const validateUpdatedUser: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await UpdatedZodSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        console.log(err);
        next(err);
    }

};
