import { AccountsRepository } from "./accounts";
import { UsersRepository } from "./users";

class Repository {
    readonly accounts: AccountsRepository
    readonly users: UsersRepository

    constructor() {
        this.accounts = new AccountsRepository()
        this.users = new UsersRepository()
    }
}

export const repository = Object.freeze(new Repository())
