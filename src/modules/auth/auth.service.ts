import httpStatus from "http-status";
import { ApiError } from "../../shared/ApiError";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { createToken, verifyToken } from "../../helpers/jwt.helpers";

import { JWT_EXPIRATION } from "../../enums/admin.enums";
import { Secret } from "jsonwebtoken";
import config from "../../config";

export const authLogin = async (payload: Pick<IAdmin, 'phoneNumber' | 'password'>) => {
    const { password, phoneNumber } = payload;
    const userExist = await Admin.isUserExist(phoneNumber);
    console.log(userExist);
    if (!userExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not exist with the given phone number");
    }
    const passwordMatch = await Admin.isPasswordMatched(userExist.password as string, password);
    if (!passwordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }
    const accessToken = createToken({ phoneNumber: userExist.phoneNumber }, config.jwtSecret as Secret, {
        expiresIn: JWT_EXPIRATION.ACCESS_EXIPIRES_IN
    });
    const refreshToken = createToken({ phoneNumber: userExist.phoneNumber }, config.jwtRefreshSecret as Secret, {
        expiresIn: JWT_EXPIRATION.REFRESH_EXIPIRES_IN
    });
    return { accessToken, refreshToken };
};


export const requestAccesToken = async (token: string) => {
    const { phoneNumber } = verifyToken(token, config.jwtRefreshSecret as Secret);
    const userExist = await Admin.isUserExist(phoneNumber);
    if (!userExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "Account does not exist");
    }
    const newAccessToken = createToken({ phoneNumber }, config.jwtSecret as Secret, {
        expiresIn: JWT_EXPIRATION.ACCESS_EXIPIRES_IN
    });
    return { accessToken: newAccessToken };
};


