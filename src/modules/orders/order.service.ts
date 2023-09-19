import httpStatus from "http-status";
import { ApiError } from "../../shared/ApiError";
import { ICow } from "../cows/cow.interface";
import { Cow } from "../cows/cow.model";
import { IUser } from "../users/user.interface";
import { User } from "../users/user.model";
import { IOrder, OrderQuery } from "./order.interface";
import { Order } from "./order.model";
import mongoose from "mongoose";
import { MyJwtPayload } from "../admin/admin.interface";

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
export const getAllOrders = async (query: OrderQuery): Promise<IOrder[]> => {
    const result = await Order.find(query);
    return result;
};
export const getSingleOrder = async (id: string, user: MyJwtPayload): Promise<IOrder | null> => {
    const result = await Order.findById(id).populate('buyer').populate('cow') as IOrder;
    const { cow, buyer }: { cow: ICow, buyer: IUser; } = result;
    console.log(user, cow, buyer);
    if ((user.role === 'seller' && (cow.seller.id != user.id)) || (user.role === 'buyer' && (buyer.id != user.id))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You can not  view others order status");
    }
    return result;
};