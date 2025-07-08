import { Request, Response } from "express";
import { Requester } from "../types/requester";

export const getUserInRequest = (req: Request, res: Response) => {
    const user = res.locals['requester'] as Requester;
    return user;
}