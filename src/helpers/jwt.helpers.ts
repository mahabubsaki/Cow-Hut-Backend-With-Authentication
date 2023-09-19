import jwt, { Secret } from "jsonwebtoken";
import { MyJwtPayload } from "../modules/admin/admin.interface";


export const createToken = (payload: Record<string, unknown>, secret: Secret, options: Record<string, unknown>): string => {
    return jwt.sign(payload, secret, options);
};
export const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as MyJwtPayload;
};
