import { readFile } from "node:fs/promises";
import * as path from "node:path";
import Config from "@config";
import { type CryptoKey, type JWTPayload, importPKCS8, EncryptJWT, jwtDecrypt, importSPKI } from "jose";

const JWT_EXPIRATION_TIME = 60*1000

export class JsonWebTokenManager {
    static instance: JsonWebTokenManager
    #privateKey: CryptoKey
    #publicKey: CryptoKey

    static async getInstance(): Promise<JsonWebTokenManager> {
        if (!JsonWebTokenManager.instance) {
            const privk = await readFile(path.join(__dirname, '../../../' ,Config.Server.PrivateKeyDirectory))
            const pubk = await readFile(path.join(__dirname, '../../../' ,Config.Server.PublicKeyDirectory))
            const pub = await importSPKI( pubk.toString(), Config.Server.KeyAlgorithm)
            const priv = await importPKCS8( privk.toString(), Config.Server.KeyAlgorithm)

            JsonWebTokenManager.instance = new JsonWebTokenManager(pub, priv)
        }
        return JsonWebTokenManager.instance;
    }

    constructor(pub: CryptoKey, priv: CryptoKey) {
        this.#publicKey = pub;
        this.#privateKey = priv;
    }

    async signToken<T extends Record<string, unknown>>(data: T): Promise<string> {
        return new EncryptJWT(data)
            .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
            .setIssuer('super-customizable-bingo-api')
            .setIssuedAt(new Date())
            .setExpirationTime(new Date(Date.now() + JWT_EXPIRATION_TIME))
            .encrypt(this.#publicKey)
    }

    async decryptToken<T extends Record<string, unknown>>(token: string): Promise<T & JWTPayload> {
        const decodedToken = await jwtDecrypt<T>(token, this.#privateKey)

        return decodedToken.payload
    }
}
