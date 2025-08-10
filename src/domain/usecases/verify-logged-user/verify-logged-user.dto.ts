import { z } from "zod/v4";
import { type LoggedUser, loggedUserSchema } from "../../entities/auth";

export function assertJwtToken(jwt: string) {
    return z.string().parse(jwt)
}

export function assertLoggedUser(user: unknown): LoggedUser {
    return loggedUserSchema.parse(user);
}
