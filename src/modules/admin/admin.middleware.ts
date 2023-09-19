import { RequestHandler } from "express";
import { AdminZodSchema } from "./admin.schema";


export const validateSignedUpAdmin: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await AdminZodSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};

