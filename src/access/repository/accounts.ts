import { type Account, accountSchema } from "../../domain/entities/account";
import databases from "../data-access/databases";

export class AccountsRepository {
    async retrieveAccount(username: string, hashedPassword: string): Promise<Account|null> {
        const dbAccount = await databases.postgres.accounts.retrieveByAccountIdAndPassword(username, hashedPassword)

        if ( !dbAccount ) return null

        return accountSchema.parse(dbAccount)
    }

    async create(account: Account): Promise<void> {
        const existing = await databases.postgres.accounts.retrieveByAccountId(account.account_id)
        if ( existing ) throw new Error('ACCOUNT_ALREADY_EXISTS')

        const created = await databases.postgres.accounts.insert(account.account_id, account.password, account.user_id)
        if ( !created ) throw new Error('ACCOUNT_NOT_CREATED')
    }
}
