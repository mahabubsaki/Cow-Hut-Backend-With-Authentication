import { Document, Model } from "mongoose";

export interface IUser extends Document {
    password: string;
    role: "seller" | "buyer";
    name: {
        firstName: string;
        middleName?: string;
        lastName: string;
    };
    phoneNumber: string;
    address: string;
    budget: number;
    income: number;
}


export interface IUserMethods {
    demo: () => string;
}

export interface IUserStatics extends Model<IUser, object, IUserMethods> {
    demo: () => string;
}