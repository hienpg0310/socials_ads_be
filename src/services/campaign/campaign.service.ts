import { CreateCampaignDTO, QueryCampaignOptions, UpdateCampaignDTO } from "../../models/campaign/dto";
import { prisma } from "../db/prisma";

const findManyCampaigns = async (options: QueryCampaignOptions) => {
    const campaigns = await prisma.campaign.findMany({
        where: {
            ...options,
        }
    });

    return campaigns;
}

const getCampaignDetail = async (id: string) => {
    const campaign = await prisma.campaign.findUnique({
        where: { id: id }
    });
    return campaign;
}

const createNewCampaign = async (data: CreateCampaignDTO) => {
    const newCampaign = await prisma.campaign.create({
        data: { ...data }
    })
    return newCampaign;
}

const updateCampaignById = async (id: string, data: UpdateCampaignDTO) => {
    const updatedCampaign = await prisma.campaign.update({
        where: {
            id: id,
        },
        data: { ...data },
    });

    return updatedCampaign;
}
const deleteACampaign = async (id: string) => {
    const deletedCampaign = await prisma.campaign.delete({
        where: { id: id },
    })
    return deletedCampaign;
}


const CampaignService = {
    findManyCampaigns,
    getCampaignDetail,
    createNewCampaign,
    updateCampaignById,
    deleteACampaign,
}

export default CampaignService;