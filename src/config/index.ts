import { generateConfig } from './generate-config'
import DatabaseConfig, { type DatabaseConfigType } from "./params/database.config"
import ServerConfig, { type ServerConfigType } from "./params/server.config"
import SecurityConfig, { type SecurityConfigType } from "./params/security.config"

export default {
    Database: generateConfig<typeof DatabaseConfig, DatabaseConfigType>(DatabaseConfig),
    Security: generateConfig<typeof SecurityConfig, SecurityConfigType>(SecurityConfig),
    Server: generateConfig<typeof ServerConfig, ServerConfigType>(ServerConfig)
}

