import { MyJwtPayload } from "./modules/admin/admin.interface";


declare global {
    namespace Express {
        interface Request {
            user: MyJwtPayload;
        }
    }
}