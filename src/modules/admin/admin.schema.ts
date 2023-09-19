import { Schema } from "mongoose";
import { z } from "zod";
import { IAdmin, IAdminMethods, IAdminStatics } from "./admin.interface";
import bcrypt from 'bcrypt';

export const AdminMongooseSchema = new Schema<IAdmin, IAdminStatics, IAdminMethods>(
    {
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        role: {
            type: String,
            enum: ['admin'],
            required: true,
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        name: {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
        },
        address: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const AdminZodSchema = z.object({
    phoneNumber: z.string(),
    role: z.literal('admin'),
    password: z.string(),
    name: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }),
    address: z.string(),
});






AdminMongooseSchema.statics.isUserExist = async function (phone: string) {
    const exist = await this.findOne({ phoneNumber: phone }, { password: 1, phoneNumber: 1 }).lean();
    return exist;
};

AdminMongooseSchema.statics.isPasswordMatched = async function (actualPass, givenPass) {
    const match = await bcrypt.compare(givenPass, actualPass as string);
    console.log(match);
    return match;
};

AdminMongooseSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password as string, 12);
    next();
});

