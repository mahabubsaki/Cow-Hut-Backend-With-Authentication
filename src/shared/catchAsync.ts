
import { NextFunction, Request, Response } from "express";

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            await fn(req, res, next);
        } catch (err) {
            next(err);
        }
    };
};

export default catchAsync;
