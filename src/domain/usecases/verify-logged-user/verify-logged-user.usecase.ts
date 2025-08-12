import type { LoggedUser } from "../../entities/authentication";
import { assertJwtToken, assertLoggedUser } from "./verify-logged-user.dto";
import { decodeLoggedUserJWT } from "./verify-logged-user.service";

export async function verifyLoggedUserUsecase(jwt: string): Promise<LoggedUser> {
    const validJwt = assertJwtToken(jwt)
    const decodedJwt = await decodeLoggedUserJWT(validJwt)

    return assertLoggedUser(decodedJwt)
}
