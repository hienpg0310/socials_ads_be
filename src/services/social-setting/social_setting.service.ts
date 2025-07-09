import { CreateSocialPlatformSettingDTO, UpdateSocialPlatformSettingDTO, QuerySocialPlatformSettingOptions } from "../../models/social-setting/dto";
import { prisma } from "../db/prisma";

const findManySocialSettings = async (options: QuerySocialPlatformSettingOptions) => {
    const socialSettings = await prisma.socialPlatformSetting.findMany({
        where: {
            ...options,
        },
        include: {
            team: true, 
        },
    });

    return socialSettings;
};

const getSocialSettingDetail = async (id: string) => {
    const socialSetting = await prisma.socialPlatformSetting.findUnique({
        where: { id }
    });
    return socialSetting;
};

const createNewSocialSetting = async (data: CreateSocialPlatformSettingDTO) => {
    const newSocialSetting = await prisma.socialPlatformSetting.create({
        data: { ...data }
    });
    return newSocialSetting;
};

const updateSocialSettingById = async (id: string, data: UpdateSocialPlatformSettingDTO) => {
    const updatedSocialSetting = await prisma.socialPlatformSetting.update({
        where: { id },
        data: { ...data },
    });
    return updatedSocialSetting;
};

const deleteSocialSetting = async (id: string) => {
    const deletedSocialSetting = await prisma.socialPlatformSetting.delete({
        where: { id },
    });
    return deletedSocialSetting;
};

const SocialSettingService = {
    findManySocialSettings,
    getSocialSettingDetail,
    createNewSocialSetting,
    updateSocialSettingById,
    deleteSocialSetting,
};

export default SocialSettingService;