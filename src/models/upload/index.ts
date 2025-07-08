import { z } from "zod";

export const ZUploadFileType = z.enum(["video", "image"]);
export const ZUploadSource = z.enum(["img_bb", "google_drive"]);
export type UploadFileType = z.infer<typeof ZUploadFileType>;
export type UploadSource = z.infer<typeof ZUploadSource>;

export const ZUploadFileSchema = z.object({
    id: z.string(),
    url: z.string(),
    type: ZUploadFileType,
    originalName: z.string().nullish(),
    source: ZUploadSource.nullish(),
    metadata: z.any().nullish(),
    createdAt: z.coerce.date().default(() => new Date()),
    updatedAt: z.coerce.date().default(() => new Date()),
});

export type UploadFile = z.infer<typeof ZUploadFileSchema>;