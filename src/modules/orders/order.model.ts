import { model } from "mongoose";
import { IOrder, IOrderStatics } from "./order.interface";
import { OrderMongooseSchema } from "./order.schema";

export const Order = model<IOrder, IOrderStatics>('Order', OrderMongooseSchema);