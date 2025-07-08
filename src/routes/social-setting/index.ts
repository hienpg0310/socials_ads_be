import { Router } from "express";
import { getUserInRequest } from "../../utils/route/utils";
import SocialSettingController from "../../controllers/social-setting/social_setting.controller";
import { successResponse } from "../../models/response";
import { MissingPathParamsRequestError } from "../../utils/types/error/common";
import { ZCreateSocialPlatformSettingDTO, ZUpdateSocialPlatformSettingDTO } from "../../models/social-setting/dto";
import TeamService from "../../services/team/team.service";
import { TeamRole } from "@prisma/client";
import { ForbiddenError } from "../../utils/types/error";

export const setUpSocialSettingRouter = () => {
    const router = Router();

    // Middleware to check permission for a social setting
    const isAllowWithSocialSetting = async (socialSettingId: string, userId: string, allowRoles?: TeamRole[]) => {
        const socialSetting = await SocialSettingController.getSocialSettingDetail(socialSettingId);
        if (!socialSetting) {
            return false;
        }
        const teamRelation = await TeamService.getTeamMemberDetail(socialSetting.teamId, userId);
        if (!teamRelation) {
            return false;
        }
        // default allow for all role
        if (!allowRoles) {
            return true;
        }
        return allowRoles.includes(teamRelation.role);
    };

    // Get all social settings by user
    router.get('/', async (req, res) => {
        const userId = getUserInRequest(req, res).id;
        const socialSettings = await SocialSettingController.getAllSocialSettingsByUserId(userId);
        return successResponse(res, socialSettings, socialSettings.length);
    });

    // Get detail
    router.get('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const userId = getUserInRequest(req, res).id;
        const isAllow = await isAllowWithSocialSetting(id, userId);
        if (!isAllow) {
            throw new ForbiddenError("You do not have permission on this social setting");
        }
        const socialSetting = await SocialSettingController.getSocialSettingDetail(id);
        return successResponse(res, socialSetting);
    });

    // Create
    router.post('/', async (req, res) => {
        const newSocialSettingData = ZCreateSocialPlatformSettingDTO.parse(req.body);

        const socialSetting = await SocialSettingController.createNewSocialSetting({
            ...newSocialSettingData,
        });

        return successResponse(res, socialSetting);
    });

    // Update
    router.put('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const userId = getUserInRequest(req, res).id;
        const isAllow = await isAllowWithSocialSetting(id, userId);
        if (!isAllow) {
            throw new ForbiddenError("You do not have permission on this social setting");
        }
        const updateSocialSettingData = ZUpdateSocialPlatformSettingDTO.parse(req.body);
        const updatedResult = await SocialSettingController.updateSocialSetting(id, updateSocialSettingData);
        return successResponse(res, updatedResult);
    });

    // Delete
    router.delete('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const userId = getUserInRequest(req, res).id;
        const isAllow = await isAllowWithSocialSetting(id, userId, ['ADMIN', 'COLLABORATOR']);
        if (!isAllow) {
            throw new ForbiddenError("You do not have permission on this social setting");
        }
        const deletedResult = await SocialSettingController.deleteSocialSetting(id);
        return successResponse(res, deletedResult);
    });

    return router;
}