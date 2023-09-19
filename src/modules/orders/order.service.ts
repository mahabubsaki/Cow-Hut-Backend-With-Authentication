import httpStatus from "http-status";
import { ApiError } from "../../shared/ApiError";
import { ICow } from "../cows/cow.interface";
import { Cow } from "../cows/cow.model";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";

export const orderSignUp = async (payload: IOrder): Promise<IOrder> => {
    const buyer = await User.findById(payload.buyer) as IUser;
    const cow = await Cow.findById(payload.cow).populate('seller') as ICow;
    const seller = cow.seller as IUser;
    if (buyer.budget < cow.price) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Buyer have insufficient funds to buy the cow.");
    }
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        cow.label = 'sold out';
        await cow.save();
        buyer.budget -= cow.price;
        buyer.save();
        seller.income += cow.price;
        seller.save();
        const result = await Order.create(payload);
        await session.commitTransaction();
        session.endSession();
        return result;
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        if (err instanceof Error) {
            throw new ApiError(500, err.message);
        } else {
            throw new ApiError(500, "Internal Server error");
        }
    }


};
export const getAllOrders = async (): Promise<IOrder[]> => {
    const result = await Order.find({});
    return result;
};