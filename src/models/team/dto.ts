import { z } from "zod";
import { ZTeamMemberSchema, ZTeamSchema } from ".";

export const ZCreateTeamDTO = ZTeamSchema.omit({
    createdAt: true,
    updatedAt: true,
    id: true,
})
export type CreateTeamDTO = z.infer<typeof ZCreateTeamDTO>;

export const ZUpdateTeamDTO = ZTeamSchema.omit({
    createdAt: true,
    updatedAt: true,
    id: true,
})
export type UpdateTeamDTO = z.infer<typeof ZUpdateTeamDTO>;

export const ZCreateTeamMemberDTO = ZTeamMemberSchema;
export type CreateTeamMemberDTO = z.infer<typeof ZCreateTeamMemberDTO>;

export const ZUpdateTeamMemberDTO = ZTeamMemberSchema;
export type UpdateTeamMemberDTO = z.infer<typeof ZUpdateTeamMemberDTO>;

// special case
export const ZAddMemberDTO = ZTeamMemberSchema.omit({
    userId: true,
}).extend({ email: z.string().email() });
export type AddMemberDTO = z.infer<typeof ZAddMemberDTO>;