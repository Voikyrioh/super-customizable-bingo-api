import { type User, userSchema } from "../../domain/entities/user";
import databases from "../data-access/databases";
import { ulid } from "ulid";
import Logger from "@logger";

export class UsersRepository {
    async retrieveById(id: string): Promise<User|null> {
        const user = await databases.postgres.users.retrieveById(id)

        return user ? userSchema.parse(user) : null
    }

    async create(user: Omit<User, 'user_id'>): Promise<string> {
        const id = ulid()
        Logger.info(`Creating user with id ${id}`)
        const created = await databases.postgres.users.insert(id, user.username, user.email)
        if ( !created ) throw new Error('USER_NOT_CREATED')

        return id
    }
}
