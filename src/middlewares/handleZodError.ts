import { ZodError, ZodIssue } from "zod";
import { IApiResponse } from "../shared/sendResponse";


export default function handleZodError(err: ZodError): IApiResponse<null> {
    const errors = err.issues.map((issue: ZodIssue) => {
        return {
            path: (issue?.path[issue.path.length - 1]),
            message: issue.message
        };
    });
    return {
        success: false,
        statusCode: 400,
        errorMessages: errors,
        message: "Zod Schema Error"
    };
}