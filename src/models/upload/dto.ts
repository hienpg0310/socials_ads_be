import { z } from "zod";
import { ZUploadFileSchema } from ".";


// Create DTO: omit id, createdAt, updatedAt
export const ZCreateUploadFileDTO = ZUploadFileSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
export type CreateUploadFileDTO = z.infer<typeof ZCreateUploadFileDTO>;

// Update DTO: omit id, createdAt, updatedAt, all fields optional
export const ZUpdateUploadFileDTO = ZUploadFileSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
}).partial();
export type UpdateUploadFileDTO = z.infer<typeof ZUpdateUploadFileDTO>;