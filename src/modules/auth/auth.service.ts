import httpStatus from "http-status";
import { ApiError } from "../../shared/ApiError";
import { IAdmin, MyJwtPayload } from "../admin/admin.interface";
import { Admin } from "../admin/admin.model";
import { createToken, verifyToken } from "../../helpers/jwt.helpers";
import bcrypt from 'bcrypt';
import { JWT_EXPIRATION } from "../../enums/admin.enums";
import { Secret } from "jsonwebtoken";
import config from "../../config";
import { User } from "../users/user.model";
import { updateAdmin } from "../admin/admin.service";
import { updateUser } from "../users/user.service";

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


export const changePassword = async (passwordObj: { oldPassword: string, newPassword: string; }, user: MyJwtPayload) => {
    const { newPassword, oldPassword } = passwordObj;
    const userDocument = await User.findById(user.id) || await Admin.findById(user.id);

    if (!userDocument) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }

    const isOldPasswordOk = await User.isPasswordMatched(userDocument.password, oldPassword);

    if (!isOldPasswordOk) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect old password");
    }
    if (newPassword !== oldPassword) {
        throw new ApiError(httpStatus.BAD_GATEWAY, "Password did not matched ");
    }

    const updatedHash = await bcrypt.hash(newPassword as string, 12);
    if (userDocument instanceof User) {
        await updateUser(user?.id as string, { password: updatedHash });
    } else {
        await updateAdmin(user?.id as string, { password: updatedHash });
    }

    return {
        message: 'No data'
    };

};

