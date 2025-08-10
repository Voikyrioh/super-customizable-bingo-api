import type { LoggedUser } from "../../entities/auth";
import { decodeLoggedUserJWT } from "./verifry-logged-user.service";
import { assertJwtToken, assertLoggedUser } from "./verify-logged-user.dto";

export async function verifyLoggedUserUseCase(jwt: string): Promise<LoggedUser> {
    const validJwt = assertJwtToken(jwt)
    const decodedJwt = decodeLoggedUserJWT(validJwt)

    return assertLoggedUser(decodedJwt)
}
