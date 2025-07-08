import { z } from "zod";

export const ZLoginBodyDTO = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const ZRefreshTokenBodyDTO = z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
})