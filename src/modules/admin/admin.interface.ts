import { JwtPayload } from "jsonwebtoken";
import { Document, Model } from "mongoose";


export interface IAdmin extends Document {
    phoneNumber: string;
    role: 'admin';
    password: string;
    name: {
        firstName: string;
        lastName: string;
    };
    address: string;
}

export interface MyJwtPayload extends JwtPayload {
    phoneNumber: string,
}

export interface IAdminMethods {
    demo: () => string;
}

export interface IAdminStatics extends Model<IAdmin, object, IAdminMethods> {
    isUserExist(phone: string): Promise<Partial<IAdmin> | null>,
    isPasswordMatched(actualPass: string, givenPass: string): Promise<boolean>;
}
