import { ErrorsCodes, HttpCodes, HttpError } from "@errors/http.error";
import { repository } from "../../../access/repository/repository";
import type { RegistrationEntity } from "../../entities/authentication";

export async function hashPassword(password: string): Promise<string> {
    return password
}

export async function createAccount(registration: RegistrationEntity, hashedPassword: string): Promise<void> {
    try {
        const userId = await repository.users.create({username: registration.username ?? 'test', email: registration.email})
        await repository.accounts.create({account_id: registration.accountId, user_id: userId, password: hashedPassword, permissions: []})
    } catch (e) {
        if ( e instanceof Error && e.message === 'ACCOUNT_ALREADY_EXISTS' ) {
            throw new HttpError(HttpCodes.BAD_REQUEST, ErrorsCodes.BAD_REQUEST, {error: 'ACCOUNT_ALREADY_EXISTS'})
        }
    }
}
