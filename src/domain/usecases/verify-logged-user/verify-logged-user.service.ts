import { AppError } from "@errors/app.error";
import Logger from "@logger";
import { JsonWebTokenManager } from "../../../entry-points/class/json-web-token";
import type { LoggedUser } from "../../entities/auth";

export async function decodeLoggedUserJWT(jwt: string): Promise<LoggedUser> {
    try {
        const jwtm = await JsonWebTokenManager.getInstance()

        return jwtm.decryptToken<LoggedUser>(jwt)
    } catch (e) {
        Logger.error('Cannot decrypt user token', e)
        throw new AppError('Error', 'CANNOT_DECRYPT_TOKEN')
    }
}
