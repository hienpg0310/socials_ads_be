import { Response } from "express"

export const appResponse = (res: Response, statusCode: number, data: any) => {
    return res.status(statusCode).json(data);
}

export const successResponse = (res: Response, data: any, count?: number) => {
    return appResponse(res, 200, {
        status: 'Success',
        count,
        data,
    })
}

export const unauthorizedResponse = (res: Response, error: string) => {
    return appResponse(res, 401, {
        status: "Unauthorized",
        error: error,
    })
}
export const forbiddenResponse = (res: Response, error: string) => {
    return appResponse(res, 403, {
        status: "Forbidden",
        error: error,
    })
}