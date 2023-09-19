import { model } from "mongoose";
import { ICow, ICowStatics } from "./cow.interface";
import { CowMongooseSchema } from "./cow.schema";

export const Cow = model<ICow, ICowStatics>('Cow', CowMongooseSchema);