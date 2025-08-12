import { z } from "zod/v4";

export const userSchema = z.object({
    user_id: z.ulid(),
    username: z.string(),
    email: z.email().nullable(),
})

export type User = z.infer<typeof userSchema>
