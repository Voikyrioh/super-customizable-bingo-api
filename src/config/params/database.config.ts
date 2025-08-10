import { z } from "zod/v4";
import { customZod } from "../../../libraries/custom-zod-types";

export type DatabaseConfigType = {
    PostgresHost: string,
    PostgresPort: number,
    PostgresUser: string,
    PostgresPassword: string,
    DatabaseName: string
}

const config = {
    PostgresPort: {
        name: 'PG_PORT',
        description: 'Port of postgres server',
        default: {
            _: 5432,
        },
        validator: customZod.application.port,
    },
    PostgresHost: {
        name: 'PG_HOST',
        description: 'Host of postgres server',
        default: {
            _: 'localhost',
        },
        validator: z.string(),
    },
    PostgresUser: {
        name: 'PG_USER',
        description: 'User of postgres server',
        default: {
            _: 'admin',
        },
        validator: z.string(),
    },
    PostgresPassword: {
        name: 'PG_PASSWORD',
        description: 'Password of postgres server',
        default: {
            _: 'password',
        },
        validator: z.string(),
    },
    DatabaseName: {
        name: 'PG_DATABASE',
        description: 'Database name',
        default: {
            _: 'bingo',
        },
        validator: z.string(),
    },
}

export default config
