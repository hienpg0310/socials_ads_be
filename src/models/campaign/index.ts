import { z } from "zod";

export const ZCampaignObjective = z.enum([
    "traffic",
    "conversions",
    "engagement",
    "brand_awareness",
]);

// Enum for CampaignStatus
export const ZCampaignStatus = z.enum([
    "active",
    "paused",
    "completed",
]);

export const ZCampaignSchema = z.object({
    id: z.string(),
    name: z.string().max(120),
    description: z.string().nullish(),

    objective: ZCampaignObjective.default("traffic"),
    startDate: z.coerce.date().default(new Date()),
    endDate: z.coerce.date().nullish(),
    dailyBudget: z.number().nullish(),
    totalBudget: z.number().nullish(),
    status: ZCampaignStatus.default("active"),
    createdAt: z.coerce.date().nullish().default(new Date()),
    updatedAt: z.coerce.date().nullish(),

    createdUserId: z.string().nullish(),
    teamId: z.string(),
    // Relations (Post[], createdUser, team) are not included in the main schema
});