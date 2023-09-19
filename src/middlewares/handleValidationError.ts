import { Error } from "mongoose";
import { IApiResponse } from "../shared/sendResponse";

export default function handleValidationError(err: Error.ValidationError): IApiResponse<null> {
    const errors = Object.values(err.errors).map(value => {
        return {
            path: value.path,
            message: value.message
        };
    });
    return {
        success: false,
        statusCode: 400,
        message: 'Validation Error',
        errorMessages: errors
    };
};