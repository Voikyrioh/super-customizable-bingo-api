import type { LoginEntity } from "../../entities/authentication";
import { generateJsonWebToken, hashPassword, retrieveUser, verifyAccount } from "./log-in.service";

export async function logInUseCase(loginRequest: LoginEntity): Promise<string> {
    const hashedPassword = await hashPassword(loginRequest.password)
    const account = await verifyAccount(loginRequest.username, hashedPassword)
    const user = await retrieveUser(account.user_id)
    const token = await generateJsonWebToken({
        username: user.username,
        user_id: account.user_id,
        permissions: account.permissions,
    })

    return token
}
