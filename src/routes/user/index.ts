import { Router } from "express"
import { Requester } from "../../utils/types/requester";
import UserController from "../../controllers/user/user.controller";
import { successResponse } from "../../models/response";

export const setUpUserRouter = () => {
    const router = Router();

    router.get('/info', async (req, res) => {
        const userId = (res.locals['requester'] as Requester).id;
        const userInfo = await UserController.getUserInformationByUserId(userId);
        return successResponse(res, userInfo);
    })

    return router;
}