import sql from "../../database/postgres";

export class Accounts {
    async retrieveByAccountIdAndPassword(accountId: string, password: string): Promise<unknown> {
        const account = await sql`
            SELECT * FROM accounts WHERE account_id = ${accountId} AND password = ${password} LIMIT 1
        `

        return account.at(0)
    }

    async retrieveByAccountId(accountId: string): Promise<unknown> {
        const account = await sql`
            SELECT * FROM accounts WHERE account_id = ${accountId} LIMIT 1
        `

        return account.at(0)
    }

    async insert(accountId: string, password: string, userId: string): Promise<boolean> {
        const [accountCreated] = await sql`
            INSERT INTO accounts (account_id, password, user_id) VALUES (${accountId}, ${password}, ${userId}) returning account_id
        `
        return !!accountCreated
    }
}
