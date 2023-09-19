import { NextFunction, Request, Response } from "express";
import { ApiError } from "../shared/ApiError";
import httpStatus from "http-status";
import { verifyToken } from "../helpers/jwt.helpers";
import config from "../config";
import { Secret } from "jsonwebtoken";

const routeGuard = (...roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {

    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "you are not authorized");
        }
        const verifiedUser = verifyToken(token as string, config.jwtSecret as Secret);
        req.user = verifiedUser;
        if (roles.length && !roles.includes(verifiedUser.role)) {
            throw new ApiError(httpStatus.FORBIDDEN, "you do not have access to this");
        }
        next();
    } catch (err) {
        next(err);
    }
};
export default routeGuard;