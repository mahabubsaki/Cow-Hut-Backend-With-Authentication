import { Schema } from "mongoose";
import { z } from "zod";
import { IOrder, IOrderMethods, IOrderStatics } from "./order.interface";



export const OrderMongooseSchema = new Schema<IOrder, IOrderStatics, IOrderMethods>(
    {

        buyer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        cow: {
            type: Schema.Types.ObjectId,
            ref: 'Cow',
            required: true
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);






export const OrderZodSchmea = z.object({

    buyer: z.string(),
    cow: z.string()
});
