import { Users } from "./users";
import { Accounts } from "./accounts";

export class PostgresDatabase {
    readonly accounts: Accounts
    readonly users: Users

    constructor() {
        this.accounts = new Accounts()
        this.users = new Users()
    }
}
