import type { LoginEntity } from "../../entities/authentication";
import { findAccountWithID, generateJsonWebToken, retrieveUser, verifyAccount } from "./log-in.service";
import { encryptPassword } from "../../../logic/encrypt-password";

export async function logInUseCase(loginRequest: LoginEntity): Promise<string> {
    const probableAccount = await findAccountWithID(loginRequest.username)
    const hashedPassword = encryptPassword(loginRequest.password, probableAccount?.salt ?? null)
    const account = await verifyAccount(loginRequest.username, hashedPassword.hash)
    const user = await retrieveUser(account.user_id)
    const token = await generateJsonWebToken({
        username: user.username,
        user_id: account.user_id,
        permissions: account.permissions,
    })

    return token
}
