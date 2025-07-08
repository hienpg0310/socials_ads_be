import { z } from "zod";

// Enum for PostStatus
export const ZPostStatus = z.enum([
    "processing",
    "draft",
    "checked",
    "scheduled",
    "publishing",
    "live",
]);

export const ZPostSchema = z.object({
    id: z.string(),
    campaignId: z.string().nullish(),
    description: z.string(),
    content: z.string().nullish(),
    status: ZPostStatus.default("draft"),
    postedTime: z.coerce.date(),
    platformIds: z.array(z.string()).default([]),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    imageIds: z.array(z.string()).default([]),
    publishedUrl: z.string().nullish(),
});

export const ZPostSettingSchema = z.object({
    postId: z.string(),
    socialSettingId: z.string(),
    model: z.string().nullish(),
    // Relations (post, socialSetting) are not included in the main schema
});