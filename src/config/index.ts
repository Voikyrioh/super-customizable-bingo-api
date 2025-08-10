import { generateConfig } from './generate-config'
import DatabaseConfig, { type DatabaseConfigType } from "./params/database.config";
import ServerConfig, { type ServerConfigType } from './params/server.config'

export default {
    Server: generateConfig<typeof ServerConfig, ServerConfigType>(ServerConfig),
    Database: generateConfig<typeof DatabaseConfig, DatabaseConfigType>(DatabaseConfig)
}

