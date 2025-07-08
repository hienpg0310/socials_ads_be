import { NextFunction, Request, Response } from "express";
import { appResponse } from "../../models/response";
import { appJwtService } from "../../services/auth/jwt.service";
import { TokenPayload } from "../../models/auth/token";
import UserService from "../../services/user/user.service";

export const setUpAuthMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer')) {
                throw new Error("Missing auth header in request");
            }
            const token = authHeader.split(' ')[1];

            // verify token and check user existed
            const tokenPayload = appJwtService.verifyToken(token) as TokenPayload
            const user = await UserService.findUserById(tokenPayload.sub);
            if (!user) {
                throw new Error("User is not valid");
            }
            // attach to res for next steo
            res.locals['requester'] = user;
        } catch (error) {
            return appResponse(res, 401, {
                status: 'Unauthorized',
                error: (error as Error).message,
            })
        }
        // if ok allow request pass through
        next();
    }
}