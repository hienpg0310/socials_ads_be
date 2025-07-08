import { z, ZodTypeAny } from "zod"

export const ZWhereFilter = <T extends ZodTypeAny>(base: T) => {
    return z.union([
        base,
        z.object({ in: z.array(base) })
    ])
}
