import { RequestHandler } from "express";
import { AuthLoginSchema, AuthTokenRequestSchema } from "./auth.schema";

export const validateAuthLogin: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await AuthLoginSchema.parseAsync(req.body);
        next();
    }
    catch (err) {
        next(err);
    }
};

export const validateRefreshToken: RequestHandler = async (req, _, next): Promise<void> => {
    try {
        await AuthTokenRequestSchema.parseAsync(req.cookies);
        next();
    }
    catch (err) {
        next(err);
    }
};