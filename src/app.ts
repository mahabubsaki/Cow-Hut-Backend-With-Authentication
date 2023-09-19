import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import sendResponse from './shared/sendResponse';
import httpStatus from 'http-status';
import globalErrorHandler from './middlewares/globalErrorHandler';
const app: Application = express();
//middleare and parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Application routes
app.use("/api/v1", router);

//Default route
app.get('/', (_, res) => {
    sendResponse(res, { statusCode: 200, success: true, message: "server runinng perfectly" });
});


//error handlers
app.use(globalErrorHandler);
app.use((req: Request, res: Response) => {
    if (!res.headersSent) {
        sendResponse(res, {
            message: "Route not found",
            statusCode: httpStatus.NOT_FOUND,
            success: false,
            errorMessages: [{ message: "API Route not found", path: req.originalUrl }]
        });
    }
});

export default app;