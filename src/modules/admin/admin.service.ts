import httpStatus from "http-status";
import { ApiError } from "../../shared/ApiError";
import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";


export const adminSignUp = async (payload: IAdmin): Promise<Partial<IAdmin>> => {
    const { password, ...result } = (await Admin.create(payload)).toObject();
    return result;
};

export const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
    const result = await Admin.findById(id);
    return result;
};
export const updateAdmin = async (id: string, body: Partial<IAdmin>): Promise<IAdmin | null> => {
    const existingUser = await Admin.findById(id);
    if (!existingUser) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Admin found to update");
    }
    const { name, ...rest } = body;
    const updatedName = { ...existingUser.name, ...name };
    const updatedUser = {
        name: updatedName,
        ...rest
    };
    const result = await Admin.findByIdAndUpdate(id, updatedUser, { new: true });
    return result;
};