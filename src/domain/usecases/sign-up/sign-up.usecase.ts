import { encryptPassword } from "../../../logic/encrypt-password";
import type { RegistrationEntity } from "../../entities/authentication";
import { createAccount } from "./sign-up.service";

export async function signUpUseCase(registration: RegistrationEntity): Promise<void> {
    const hashedPassword = encryptPassword(registration.password, null)
    await createAccount(registration, hashedPassword.hash, hashedPassword.salt)
}
