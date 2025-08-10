import postgres from "postgres";
import Config from "@config";

const sql = postgres({
    database: Config.Database.DatabaseName,
    user: Config.Database.PostgresUser,
    password: Config.Database.PostgresPassword,
    port: Config.Database.PostgresPort,
    host: Config.Database.PostgresHost,
})

export default sql;
