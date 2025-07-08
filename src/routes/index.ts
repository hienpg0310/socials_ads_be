import { NextFunction, Request, Response, Router } from "express"
import { setUpAuthRouter } from "./auth";
import { ErrorMiddleware } from "../utils/middlewares/error";
import { setUpAuthMiddleware } from "../utils/middlewares/auth";
import { setUpUserRouter } from "./user";
import { setUpTeamRouter } from "./team";
import { setUpCampaignRouter } from "./campaign";
import { setUpPostRouter } from "./post";
import { setUpSocialSettingRouter } from "./social-setting";
import { setUpUploadRouter } from "./upload";

export const setUpAppRoutes = () => {
    const rootRouter = Router();
    const authMiddleware = setUpAuthMiddleware();

    rootRouter.use('/auth', setUpAuthRouter());
    rootRouter.use('/user', authMiddleware, setUpUserRouter());
    rootRouter.use('/campaign', authMiddleware, setUpCampaignRouter());
    rootRouter.use('/post', authMiddleware, setUpPostRouter());
    rootRouter.use('/upload', setUpUploadRouter());
    rootRouter.use('/social-setting', authMiddleware, setUpSocialSettingRouter());
    rootRouter.use('/team', authMiddleware, setUpTeamRouter());


    // add error handler for handle all route error
    rootRouter.use(ErrorMiddleware)

    return rootRouter;
}