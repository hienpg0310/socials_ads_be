import { z } from "zod";

export const ZUserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string().email(),
    salt: z.string().nullish(),
    password: z.string(),
    age: z.number().int().nullish(),
    isVerified: z.boolean().nullish(),
    isActivated: z.boolean().nullish(),
    createdAt: z.coerce.date().nullish(),
    updatedAt: z.coerce.date().nullish(),
});

export const ZUserResponse = ZUserSchema.omit({ salt: true, password: true, createdAt: true, updatedAt: true })