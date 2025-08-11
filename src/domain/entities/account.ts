import { z } from "zod/v4";

export const accountSchema = z.object({
    account_id: z.string(),
    password: z.string(),
    salt: z.string(),
    permissions: z.array(z.string()).default([]),
    user_id: z.ulid(),
})

export type Account = z.infer<typeof accountSchema>
