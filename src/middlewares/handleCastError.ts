import { Error } from "mongoose";
import { IApiResponse } from "../shared/sendResponse";

export default function handleCastError(err: Error.CastError): IApiResponse<null> {
    const errors = [
        { path: err.path, message: "Invalid object id given" }
    ];
    return {
        success: false,
        message: 'MongoDB Cast Error',
        statusCode: 400,
        errorMessages: errors
    };
}