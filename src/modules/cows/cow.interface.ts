import { Document, Model, Types } from "mongoose";
import { IUser } from "../users/user.interface";

export interface ICow extends Document {
    name: string;
    age: number;
    price: number;
    location: "Dhaka" | "Chattogram" | "Barishal" | "Rajshahi" | "Sylhet" | "Comilla" | "Rangpur" | "Mymensingh";
    breed: "Brahman" | "Nellore" | "Sahiwal" | "Gir" | "Indigenous" | "Tharparkar" | "Kankrej";
    weight: number;
    label: "for sale" | "sold out";
    category: "Dairy" | "Beef" | "Dual Purpose";
    seller: Types.ObjectId | IUser;
}

export interface ICowMethods {
    demo: () => string;
}

export interface ICowStatics extends Model<ICow, object, ICowMethods> {
    demo: () => string;
}
