import { Document, Model } from "mongoose";
import { IUser } from "../users/user.interface";
import { ICow } from "../cows/cow.interface";

export interface IOrder extends Document {
    cow: ICow,
    buyer: IUser;
}
export interface OrderQuery {
    seller?: string;
    buyer?: string;
}

export interface IOrderMethods {
    demo: () => string;
}

export interface IOrderStatics extends Model<IOrder, object, IOrderMethods> {
    demo: () => string;
}
