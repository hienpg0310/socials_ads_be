import { CreateSocialPlatformSettingDTO, UpdateSocialPlatformSettingDTO } from "../../models/social-setting/dto";
import SocialSettingService from "../../services/social-setting/social_setting.service";
import TeamService from "../../services/team/team.service";


async function getAllSocialSettingsByUserId(userId: string) {
    const teams = await TeamService.findTeamsByUserId(userId);
    const socialSettings = await SocialSettingService.findManySocialSettings({
        teamId: { in: teams.map((t) => t.id) }
    });
    return socialSettings;
}

async function getSocialSettingDetail(id: string) {
    const socialSetting = await SocialSettingService.getSocialSettingDetail(id);
    return socialSetting;
}

async function createNewSocialSetting(data: CreateSocialPlatformSettingDTO) {
    const socialSetting = await SocialSettingService.createNewSocialSetting(data);
    return socialSetting;
}

async function updateSocialSetting(id: string, data: UpdateSocialPlatformSettingDTO) {
    const updated = await SocialSettingService.updateSocialSettingById(id, data);
    return true;
}

async function deleteSocialSetting(id: string) {
    const deleted = await SocialSettingService.deleteSocialSetting(id);
    return true;
}

const SocialSettingController = {
    getAllSocialSettingsByUserId,
    getSocialSettingDetail,
    createNewSocialSetting,
    updateSocialSetting,
    deleteSocialSetting,
};

export default SocialSettingController;