import { z } from "zod";
import { ZCampaignSchema } from ".";
import { ZWhereFilter } from "../../utils/types/zod";

// Create DTO: omit fields that should not be set by client
export const ZCreateCampaignDTO = ZCampaignSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export type CreateCampaignDTO = z.infer<typeof ZCreateCampaignDTO>;

// Update DTO: omit id, createdAt, updatedAt
export const ZUpdateCampaignDTO = ZCampaignSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).partial();
export type UpdateCampaignDTO = z.infer<typeof ZUpdateCampaignDTO>;

export const ZQueryCampaignOptions = ZCampaignSchema.extend({
    id: ZWhereFilter(z.string()),
    teamId: ZWhereFilter(z.string()),
}).partial();
export type QueryCampaignOptions = z.infer<typeof ZQueryCampaignOptions>;