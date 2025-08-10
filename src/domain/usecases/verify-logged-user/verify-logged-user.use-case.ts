import type { LoggedUser } from "../../entities/auth";
import { assertJwtToken, assertLoggedUser } from "./verify-logged-user.dto";
import { decodeLoggedUserJWT } from "./verify-logged-user.service";

export async function verifyLoggedUserUseCase(jwt: string): Promise<LoggedUser> {
    const validJwt = assertJwtToken(jwt)
    const decodedJwt = await decodeLoggedUserJWT(validJwt)

    return assertLoggedUser(decodedJwt)
}
