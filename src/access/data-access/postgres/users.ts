import sql from "../../database/postgres";

export class Users {
    async retrieveById(id: string): Promise<unknown> {
        const user = await sql`
            SELECT * FROM users WHERE user_id = ${id} LIMIT 1
        `

        return user.at(0)
    }

    async insert(id: string, username: string, email: string|null): Promise<boolean> {
        const userCreated = await sql`
            INSERT INTO users (user_id, username, email) VALUES (${id}, ${username}, ${email}) returning user_id
        `
        return !!userCreated.at(0)
    }
}
