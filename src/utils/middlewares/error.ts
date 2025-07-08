import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { appResponse, forbiddenResponse, unauthorizedResponse } from "../../models/response";
import { AppError } from "../types/error";

// handle app error
export const ErrorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    // Error validation
    if (error instanceof ZodError) {
        return appResponse(res, 422, {
            status: 'Unprocessable Entity',
            error: error.message
        })
    }
    if (error instanceof AppError) {
        switch (error.statusCode) {
            case 401:
                return unauthorizedResponse(res, error.message);
            case 403:
                return forbiddenResponse(res, error.message);
            default:
                return appResponse(res, error.statusCode, {
                    status: error.name,
                    error: error.message,
                });
        }
    }
    // default error create with Error class
    if (error instanceof Error) {
        return appResponse(res, 400, {
            status: 'Bad request',
            error: error.message,
        })
    }
    // other error type
    return appResponse(res, 500, {
        status: "Internal Server Error",
        error: error,
    })


}