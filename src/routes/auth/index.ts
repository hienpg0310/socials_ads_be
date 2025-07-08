import { Router } from "express"
import { ZLoginBodyDTO, ZRefreshTokenBodyDTO } from "../../models/auth/dto";
import AuthController from "../../controllers/auth/auth.controller";
import { successResponse } from "../../models/response";
import AuthService from "../../services/auth/auth.service";

export const setUpAuthRouter = () => {
    const router = Router();

    router.post('/login', async (req, res) => {
        const body = ZLoginBodyDTO.parse(req.body);
        const user = await AuthController.login(body.email, body.password);
        // create pair tokens for user
        const tokens = AuthService.generatePairTokens(user.id);
        return successResponse(res, {
            ...tokens,
        })

    });
    router.post('/token/refresh', async (req, res) => {
        const body = ZRefreshTokenBodyDTO.parse(req.body);
        const newTokens = AuthService.refreshToken(body.accessToken, body.refreshToken);
        return successResponse(res, {
            ...newTokens
        })
    });

    return router;
}