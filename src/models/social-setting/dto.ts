import { z } from "zod";
import { ZSocialPlatformSettingSchema } from ".";
import { ZWhereFilter } from "../../utils/types/zod";

// Create DTO: omit id, createdAt, updatedAt, createdBy
export const ZCreateSocialPlatformSettingDTO = ZSocialPlatformSettingSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
});
export type CreateSocialPlatformSettingDTO = z.infer<typeof ZCreateSocialPlatformSettingDTO>;

// Update DTO: omit id, createdAt, updatedAt, createdBy
export const ZUpdateSocialPlatformSettingDTO = ZSocialPlatformSettingSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    createdBy: true,
}).partial();
export type UpdateSocialPlatformSettingDTO = z.infer<typeof ZUpdateSocialPlatformSettingDTO>;

export const ZQuerySocialPlatformSettingOptions = ZSocialPlatformSettingSchema.extend({
    id: ZWhereFilter(z.string()),
    teamId: ZWhereFilter(z.string()),
}).partial();
export type QuerySocialPlatformSettingOptions = z.infer<typeof ZQuerySocialPlatformSettingOptions>;