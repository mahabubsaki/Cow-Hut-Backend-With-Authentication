import { Schema } from "mongoose";
import { z } from 'zod';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { IUser, IUserMethods, IUserStatics } from "./user.interface";
import { ApiError } from "../../shared/ApiError";
import { Admin } from "../admin/admin.model";

export const UserMongooseSchema = new Schema<IUser, IUserStatics, IUserMethods>(
    {
        password: {
            type: String,
            required: true,
            select: false,
        },
        role: {
            type: String,
            required: true,
            enum: ["buyer", "seller"]
        },
        name: {
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            middleName: {
                type: String
            }
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        },
        address: {
            type: String,
            required: true
        },
        budget: {
            type: Number,
            required: true
        },
        income: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        }
    }
);


UserMongooseSchema.pre('save', async function (next) {
    if (this.role === 'buyer' && this.income > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Buyers won't have any income");
    }
    if (this.role === 'seller' && this.budget > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Sellers won't have any budget");
    }
    next();
});

const nonEmptyObject = z.custom((value) => {
    if (value === null) {
        throw new Error('Object must not be empty');
    }
    if (typeof value === 'object' && Object.keys(value).length === 0) {
        throw new Error('Object must not be empty');
    }
    return value;
});

UserMongooseSchema.pre('save', async function (next) {
    const exist = await Admin.findOne({ phoneNumber: this.phoneNumber });
    if (exist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User already exist with the given number");
    }
    next();
});


UserMongooseSchema.statics.isUserExist = async function (phone: string) {
    const exist = await this.findOne({ phoneNumber: phone }, { password: 1, phoneNumber: 1, _id: 1, role: 1 }).lean();
    return exist;
};

UserMongooseSchema.statics.isPasswordMatched = async function (actualPass, givenPass) {

    const match = await bcrypt.compare(givenPass, actualPass as string);
    console.log(match);
    return match;
};


UserMongooseSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password as string, 12);
    next();
});




UserMongooseSchema.pre('findOneAndUpdate', async function (next) {
    const id = this.getQuery()._id;
    const reqBody = this.getUpdate() as Partial<IUser>;
    if (reqBody.password) {
        reqBody.password = await bcrypt.hash(reqBody.password as string, 12);
    }
    const { _doc: data } = await this.model.findById(id);
    const updatedData = { ...data, ...reqBody };
    if (updatedData.role === 'buyer' && updatedData.income > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Buyers won't have any income");
    }
    if (updatedData.role === 'seller' && updatedData.budget > 0) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Sellers won't have any budget");
    }
    next();
});


function createZodObject(method: 'update' | 'create') {

    const nameObj = z.object({
        firstName: z.string({
            invalid_type_error: "Firstname must be string",
            required_error: "Firstname is required"
        }),
        lastName: z.string({
            invalid_type_error: "Lastname must be string",
            required_error: "Lastname is required"
        }),
        middleName: z.string().optional()
    }, {
        required_error: "Name is required"
    });
    const zodObj = z.object({
        password: z.string({
            invalid_type_error: "Password must be string",
            required_error: "Password is required"
        }),
        role: z.enum(["buyer", "seller"], {
            invalid_type_error: "Role must be either buyer or seller",
            required_error: "Role is required"
        }),
        name: method === 'create' ? nonEmptyObject.and(nameObj.strict()) : nonEmptyObject.and(nameObj.partial().strict()),
        phoneNumber: z.string({
            invalid_type_error: "Phonenumber must be string",
            required_error: "Phonenumber is required"
        }),
        address: z.string({
            invalid_type_error: "Address must be string",
            required_error: "Address is required"
        }),
        budget: z.number({
            invalid_type_error: "Budget must be number",
            required_error: "Budget is required"
        }),
        income: z.number({
            invalid_type_error: "Income must be number",
            required_error: "Income is required"
        })
    });

    return zodObj;

}



export const UserZodSchema = createZodObject('create').refine(schema => {
    return !((schema.role === 'buyer' && schema.income > 0) || (schema.role === 'seller' && schema.budget > 0));
}, {
    message: "Buyers wont't have any income and sellers won't have any budget",
    path: ["role", "budget", "income"]
});

export const UpdatedZodSchema = createZodObject('update').omit({ role: true }).partial().strict()


