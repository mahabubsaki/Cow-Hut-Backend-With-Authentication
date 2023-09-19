import { Schema } from "mongoose";
import { z } from "zod";
import { ICow, ICowMethods, ICowStatics } from "./cow.interface";


export const CowMongooseSchema = new Schema<ICow, ICowStatics, ICowMethods>(
    {
        name: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            enum: [
                'Dhaka',
                'Chattogram',
                'Barishal',
                'Rajshahi',
                'Sylhet',
                'Comilla',
                'Rangpur',
                'Mymensingh'
            ],
            required: true,
        },
        breed: {
            type: String,
            enum: ['Brahman', 'Nellore', 'Sahiwal', 'Gir', 'Indigenous', 'Tharparkar', 'Kankrej'],
            required: true,
        },
        weight: {
            type: Number,
            required: true,
        },
        label: {
            type: String,
            enum: ['for sale', 'sold out'],
            default: 'for sale',
        },
        category: {
            type: String,
            enum: ['Dairy', 'Beef', 'Dual Purpose'],
            required: true,
        },
        seller: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
    }
);






export const CowZodSchmea = z.object({
    name: z.string().min(3).max(255),
    age: z.number().int().positive(),
    price: z.number().positive(),
    location: z.enum([
        "Dhaka",
        "Chattogram",
        "Barishal",
        "Rajshahi",
        "Sylhet",
        "Comilla",
        "Rangpur",
        "Mymensingh",
    ]),
    breed: z.enum([
        "Brahman",
        "Nellore",
        "Sahiwal",
        "Gir",
        "Indigenous",
        "Tharparkar",
        "Kankrej",
    ]),
    weight: z.number().positive(),
    label: z.enum(["for sale", "sold out"]).optional().default("for sale"),
    category: z.enum(["Dairy", "Beef", "Dual Purpose"]),
    seller: z.string(),
});
