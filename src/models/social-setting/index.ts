import { z } from "zod";

// Enums
export const ZPlatform = z.enum([
    "facebook",
    "tiktok",
    "instagram",
]);

export const ZSettingStatus = z.enum([
    "connected",
    "not_connected",
]);

export const ZSocialPlatformSettingSchema = z.object({
    id: z.string(),
    platform: ZPlatform,
    pageId: z.string().nullish(),
    pageName: z.string().nullish(),
    pageLink: z.string().nullish(),
    accessToken: z.string(),
    status: ZSettingStatus.default("not_connected"),
    expiresAt: z.coerce.date().nullish(),
    metadata: z.any().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    teamId: z.string(),
    createdBy: z.string().nullish(),
    // Relations (team, createdUser, PostSetting, UserPageSetting) are not included in the main schema
});