import { z } from 'zod/v4'

export const loggedUserSchema = z.object({
    user_id: z.ulid(),
    username: z.string(),
    permissions: z.array(z.string()),
})
export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const registrationSchema = z.object({
    accountId: z.string(),
    password: z.string(),
    confirmPassword: z.string(),
    username: z.string().nullable(),
    email: z.email().nullable().default(null),
})

export type RegistrationEntity = z.infer<typeof registrationSchema>
export type LoginEntity = z.infer<typeof loginSchema>
export type LoggedUser = z.infer<typeof loggedUserSchema>
