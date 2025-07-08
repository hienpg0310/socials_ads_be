import { z } from "zod";

export const ZTeamSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    description: z.string().nullish(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export const ZTeamRoleSchema = z.enum(["OWNER", "ADMIN", "COLLABORATOR"]);
// Full entity schema (e.g. for responses)
export const ZTeamMemberSchema = z.object({
    userId: z.string(),
    teamId: z.string(),
    role: ZTeamRoleSchema,
});