import { RegistrationEntity } from "../../entities/authentication";
import { createAccount, hashPassword } from "./sign-up.service";

export async function signUpUseCase(registration: RegistrationEntity): Promise<void> {
    const hashedPassword = await hashPassword(registration.password)
    await createAccount(registration, hashedPassword)
}
