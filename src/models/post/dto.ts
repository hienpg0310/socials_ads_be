import { z } from "zod";
import { ZPostSchema } from ".";
import { ZWhereFilter } from "../../utils/types/zod";

// Create DTO: omit id, createdAt, updatedAt
export const ZCreatePostDTO = ZPostSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export type CreatePostDTO = z.infer<typeof ZCreatePostDTO>;

// Update DTO: omit id, createdAt, updatedAt
export const ZUpdatePostDTO = ZPostSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).partial();
export type UpdatePostDTO = z.infer<typeof ZUpdatePostDTO>;

export const ZQueryPostOptions = ZPostSchema.omit({ platformIds: true, imageIds: true }).extend({
    id: ZWhereFilter(z.string()),
    campaignId: ZWhereFilter(z.string()),
    teamId: ZWhereFilter(z.string()),
}).partial();
export type QueryPostOptions = z.infer<typeof ZQueryPostOptions>;


export const ZCreatePostConfig = z.object({
    repeat: z.number().int().min(1).default(1),     // “Repeat *”  (times to repost)
    start: z.coerce.date().default(() => new Date()),
    end: z.coerce.date().default(() => new Date()),
    platforms: z.array(z.string()).default([])
})

export const ZCreatePostWithConfigDTO = ZCreatePostDTO.omit({ postedTime: true, platformIds: true, }).extend({
    config: ZCreatePostConfig,
})
export type CreatePostWithConfigDTO = z.infer<typeof ZCreatePostWithConfigDTO>;

