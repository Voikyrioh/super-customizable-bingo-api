import { PostgresDatabase } from "./postgres/database";

class Databases {
    readonly postgres: PostgresDatabase;

    constructor() {
        this.postgres = new PostgresDatabase()
    }
}

export default Object.freeze(new Databases())
