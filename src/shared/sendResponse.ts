import { Response } from "express";
interface ErrorMessages {
    path: string | number,
    message: string;
}
export interface IApiResponse<T> {
    statusCode: number,
    success: boolean,
    message: string;
    data?: T | null;
    meta?: { page: number, limit: number, count: number; };
    errorMessages?: ErrorMessages[] | null;
    stack?: string | null;
}



const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
    const responseData: IApiResponse<T> = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message,
        meta: data.meta,
        data: null,
        errorMessages: null,
        stack: null
    };
    if (data.errorMessages && data.errorMessages.length > 0) {
        responseData.errorMessages = data.errorMessages;
        responseData.stack = data.stack;
        delete responseData.data;
    } else {
        responseData.data = data.data;
        delete responseData.errorMessages;
        delete responseData.stack;
    }
    if (!data.meta) {
        delete data.meta;
    }

    res.status(data.statusCode).json(responseData);
};

export default sendResponse;
