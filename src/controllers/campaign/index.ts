import { CreateCampaignDTO, UpdateCampaignDTO } from "../../models/campaign/dto";
import CampaignService from "../../services/campaign/campaign.service";
import { prisma } from "../../services/db/prisma";
import TeamService from "../../services/team/team.service";

async function getAllCampaignByUser(userId: string) {
    const teams = await TeamService.findTeamsByUserId(userId);
    const campaigns = await CampaignService.findManyCampaigns({
        teamId: { in: teams.map((t) => t.id) }
    });
    return campaigns;
}
async function getCampaignDetail(id: string) {
    const campaign = await CampaignService.getCampaignDetail(id);
    return campaign;
}
async function createNewCampaign(data: CreateCampaignDTO) {
    const campaign = await CampaignService.createNewCampaign(data);
    return campaign;
}

async function updateACampaign(id: string, data: UpdateCampaignDTO) {
    const updatedCampaign = await CampaignService.updateCampaignById(id, data);
    return true;
}

async function deleteACampaign(id: string) {
    const deletedCampaign = await CampaignService.deleteACampaign(id);
    return true;
}


const CampaignController = {
    getAllCampaignByUser,
    getCampaignDetail,
    createNewCampaign,
    updateACampaign,
    deleteACampaign,
}
export default CampaignController;