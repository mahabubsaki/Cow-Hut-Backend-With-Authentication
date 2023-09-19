import { Document, Model, Types } from "mongoose";
import { IUser } from "../users/user.interface";
import { ICow } from "../cows/cow.interface";

export interface IOrder extends Document {
    cow: ICow | Types.ObjectId,
    buyer: IUser | Types.ObjectId;
}

export interface IOrderMethods {
    demo: () => string;
}

export interface IOrderStatics extends Model<IOrder, object, IOrderMethods> {
    demo: () => string;
}
