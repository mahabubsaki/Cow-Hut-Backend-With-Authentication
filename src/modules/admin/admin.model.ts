import { model } from "mongoose";
import { IAdmin, IAdminStatics } from "./admin.interface";
import { AdminMongooseSchema } from "./admin.schema";

export const Admin = model<IAdmin, IAdminStatics>('Admin', AdminMongooseSchema);