import { Router } from "express"
import { getUserInRequest } from "../../utils/route/utils";
import CampaignController from "../../controllers/campaign";
import { successResponse } from "../../models/response";
import { MissingPathParamsRequestError } from "../../utils/types/error/common";
import { ZCreateCampaignDTO, ZUpdateCampaignDTO } from "../../models/campaign/dto";
import CampaignService from "../../services/campaign/campaign.service";
import TeamService from "../../services/team/team.service";
import { TeamRole } from "@prisma/client";
import { ForbiddenError } from "../../utils/types/error";

export const setUpCampaignRouter = () => {
    const router = Router();

    // middleware check permission
    const isAllowWithCampaign = async (campaignId: string, userId: string, allowRoles?: TeamRole[]) => {
        const campaign = await CampaignService.getCampaignDetail(campaignId)
        if (!campaign) {
            return false;
        }
        const teamRelation = await TeamService.getTeamMemberDetail(campaign.teamId, userId);
        if (!teamRelation) {
            return false;
        }
        // default allow for all role
        if (!allowRoles) {
            return true;
        }
        return allowRoles.includes(teamRelation.role);
    }

    router.get('/', async (req, res) => {
        const userId = getUserInRequest(req, res).id;
        const campaigns = await CampaignController.getAllCampaignByUser(userId);
        return successResponse(res, campaigns, campaigns.length);
    })

    router.get('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const userId = getUserInRequest(req, res).id;
        // check permission
        const isAllow = await isAllowWithCampaign(id, userId);
        if (!isAllow) {
            throw new ForbiddenError("You do not have permission on this campaign");
        }
        const campaign = await CampaignService.getCampaignDetail(id);
        return successResponse(res, campaign);

    });

    router.post('/', async (req, res) => {
        const userId = getUserInRequest(req, res).id;
        const newCampainData = ZCreateCampaignDTO.parse(req.body);

        const campaign = await CampaignController.createNewCampaign({
            ...newCampainData,
            createdUserId: userId,
        })

        return successResponse(res, campaign);
    })

    router.put('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const userId = getUserInRequest(req, res).id;
        // check permission
        const isAllow = await isAllowWithCampaign(id, userId,);
        if (!isAllow) {
            throw new ForbiddenError("You do not have permission on this campaign");
        }
        const updateCampaignData = ZUpdateCampaignDTO.parse(req.body);
        const updatedResult = await CampaignService.updateCampaignById(id, updateCampaignData);
        return successResponse(res, updatedResult);

    });

    router.delete('/:id', async (req, res) => {
        const id = req.params.id as string;
        if (!id) {
            throw MissingPathParamsRequestError(['id']);
        }
        const userId = getUserInRequest(req, res).id;
        // check permission
        const isAllow = await isAllowWithCampaign(id, userId, ['ADMIN', 'OWNER']);
        if (!isAllow) {
            throw new ForbiddenError("You do not have permission on this campaign");
        }
        const deletedResult = await CampaignService.deleteACampaign(id);
        return successResponse(res, deletedResult);
    });



    return router;
}