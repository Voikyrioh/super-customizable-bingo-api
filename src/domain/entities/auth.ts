import { z } from 'zod/v4'
import { customZod } from "../../../libraries/custom-zod-types";

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
})

export const registerSchema = z.object({
    auth_id: z.string(),
    password: customZod.data.validPassword,
    confirmPassword: z.string(),
    username: z.string().nullable(),
    email: z.email().nullable(),
})

export const loggedUserSchema = z.object({
    user_id: z.ulid(),
    username: z.string(),
    permissions: z.array(z.string()),
})

export function validateRegistrationForm(registerForm: unknown): RegisterForm {
    return registerSchema
        .refine((value) => value.password.length <= 100, {message: 'Password is too long'})
        .refine((value) => value.password === value.confirmPassword, {message: 'Passwords do not match'})
        .refine((value) => !value.username || value.username.length <= 20, {message: 'Username is too long'})
        .refine((value) => !value.email || value.email.length <= 50, {message: 'Email is too long'})
        .parse(registerForm)
}

export type RegisterForm = z.infer<typeof registerSchema>
export type LoginForm = z.infer<typeof loginSchema>
export type LoggedUser = z.infer<typeof loggedUserSchema>
