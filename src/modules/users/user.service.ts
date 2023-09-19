import httpStatus from "http-status";
import { ApiError } from "../../shared/ApiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const userSignUp = async (payload: IUser): Promise<Partial<IUser>> => {
    const { password, ...result } = (await User.create(payload)).toObject();
    return result;
};
export const getAllUsers = async (): Promise<IUser[]> => {
    const result = await User.find({});
    return result;
};

export const getSingleUser = async (id: string): Promise<IUser | null> => {
    const result = await User.findById(id);
    return result;
};

export const deleteUser = async (id: string) => {
    const result = await User.findByIdAndDelete(id);
    return result;
};

export const updateUser = async (id: string, body: Partial<IUser>): Promise<IUser | null> => {
    const existingUser = await User.findById(id);
    if (!existingUser) {
        throw new ApiError(httpStatus.NOT_FOUND, "No User found to update");
    }
    const { name, ...rest } = body;
    const updatedName = { ...existingUser.name, ...name };
    const updatedUser = {
        name: updatedName,
        ...rest
    };
    const result = await User.findByIdAndUpdate(id, updatedUser, { new: true });
    return result;
};