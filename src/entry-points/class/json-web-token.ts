import { readFile } from "node:fs/promises";
import * as path from "node:path";
import Config from "@config";
import jose, { type CryptoKey, type JWTPayload } from "jose";

const JWT_EXPIRATION_TIME = 60*1000

export class JsonWebTokenManager {
    static instance: JsonWebTokenManager;
    #key: CryptoKey;

    static async getInstance(): Promise<JsonWebTokenManager> {
        if (!JsonWebTokenManager.instance) {
            const pk = await readFile(path.join(__dirname ,Config.Server.PrivateKeyURL))
            const key = await jose.importPKCS8( pk.toString(), Config.Server.PrivateKeyAlgorithm);

            JsonWebTokenManager.instance = new JsonWebTokenManager(key);
        }
        return JsonWebTokenManager.instance;
    }

    constructor(key: CryptoKey) {
        this.#key = key;
    }

    async signToken<T extends Record<string, unknown>>(data: T): Promise<string> {
        return new jose.EncryptJWT(data)
            .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A256GCM' })
            .setIssuer('super-customizable-bingo-api')
            .setIssuedAt(new Date())
            .setExpirationTime(new Date(Date.now() + JWT_EXPIRATION_TIME))
            .encrypt(this.#key);
    }

    async decryptToken<T extends Record<string, unknown>>(token: string): Promise<T & JWTPayload> {
        const decodedToken = await jose.jwtDecrypt<T>(token, this.#key)

        return decodedToken.payload
    }
}
