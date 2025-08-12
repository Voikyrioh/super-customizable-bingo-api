import { JsonWebTokenManager } from "../../../entry-points/class/json-web-token";
import type { Account } from "../../entities/account";
import type { LoggedUser } from "../../entities/authentication";
import type { User } from "../../entities/user";
import { repository } from "../../../access/repository/repository";
import { ErrorsCodes, HttpCodes, HttpError } from "@errors/http.error";

export async function findAccountWithID(accountId: string): Promise<Account|null> {
    const account = await repository.accounts.retrieveByAccountId(accountId);

    return account;
}

export async function verifyAccount(account_id: string, password: string): Promise<Account> {
    const account = await repository.accounts.retrieveAccount(account_id, password)
    if ( !account ) throw new HttpError(HttpCodes.UNAUTHORIZED, ErrorsCodes.UNAUTHORIZED, { error: 'INVALID_CREDENTIALS'})

    return account
}

export async function retrieveUser(user_id: string): Promise<User> {
    const user = await repository.users.retrieveById(user_id)
    if ( !user ) throw new HttpError(HttpCodes.NOT_FOUND, ErrorsCodes.NOT_FOUND)

    return user
}

export async function generateJsonWebToken(user: LoggedUser): Promise<string> {
    const jwtm = await JsonWebTokenManager.getInstance()
    const token = await jwtm.signToken<LoggedUser>(user)

    return token
}
