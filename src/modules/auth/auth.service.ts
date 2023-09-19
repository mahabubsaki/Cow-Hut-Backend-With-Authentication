import httpStatus from "http-status";
import { ApiError } from "../../shared/ApiError";
import { IAdmin } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { createToken, verifyToken } from "../../helpers/jwt.helpers";

import { JWT_EXPIRATION } from "../../enums/admin.enums";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { User } from "../users/user.model";

export const authLogin = async (payload: Pick<IAdmin, 'phoneNumber' | 'password'>) => {
    const { password, phoneNumber } = payload;

    const userExist = await Admin.isUserExist(phoneNumber);
    const userExist2 = await User.isUserExist(phoneNumber);
    if (!userExist && !userExist2) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not exist with the given phone number");
    }
    let passwordMatch;
    if (userExist) {
        passwordMatch = await Admin.isPasswordMatched(userExist?.password as string, password);
    } else if (userExist2) {
        passwordMatch = await User.isPasswordMatched(userExist2?.password as string, password);
    }
    if (!passwordMatch) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }

    const accessToken = createToken({ id: userExist ? userExist?._id : userExist2?._id, phoneNumber: userExist ? userExist?.phoneNumber : userExist2?.phoneNumber, role: userExist ? userExist?.role : userExist2?.role }, config.jwtSecret as Secret, {
        expiresIn: JWT_EXPIRATION.ACCESS_EXIPIRES_IN
    });
    const refreshToken = createToken({ id: userExist ? userExist?._id : userExist2?._id, phoneNumber: userExist ? userExist?.phoneNumber : userExist2?.phoneNumber, role: userExist ? userExist?.role : userExist2?.role }, config.jwtRefreshSecret as Secret, {
        expiresIn: JWT_EXPIRATION.REFRESH_EXIPIRES_IN
    });

    return { accessToken, refreshToken };
};


export const requestAccesToken = async (token: string) => {
    const { phoneNumber } = verifyToken(token, config.jwtRefreshSecret as Secret);
    const userExist = await Admin.isUserExist(phoneNumber);
    const userExist2 = await User.isUserExist(phoneNumber);
    if (!userExist && !userExist2) {
        throw new ApiError(httpStatus.NOT_FOUND, "Account does not exist");
    }
    const newAccessToken = createToken({ id: userExist ? userExist?._id : userExist2?._id, phoneNumber: userExist ? userExist?.phoneNumber : userExist2?.phoneNumber, role: userExist ? userExist?.role : userExist2?.role }, config.jwtSecret as Secret, {
        expiresIn: JWT_EXPIRATION.ACCESS_EXIPIRES_IN
    });
    return { accessToken: newAccessToken };
};


