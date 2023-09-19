import { IAdmin } from "./admin.interface";
import { Admin } from "./admin.model";


export const adminSignUp = async (payload: IAdmin): Promise<Partial<IAdmin>> => {
    const { password, ...result } = (await Admin.create(payload)).toObject();
    return result;
};

