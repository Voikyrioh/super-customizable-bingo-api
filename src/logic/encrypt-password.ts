import { getRandomValues, scryptSync } from "node:crypto"
import Config from "@config";

/*
    Argon is a new encryption algorithm recommended by OWASP, but there's not very good native
    ref: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
*/
export function encryptPassword(password: string, salt: string|null): { hash: string, salt: string } {
    salt = salt ?? [...getRandomValues(new Uint8Array(16))].map(value => value.toString(16).padStart(2, "0")).join('')
    const hash = scryptSync(password.normalize("NFKC"), salt + Config.Security.PasswordPepper, 64, {
        N: 16384,
        r: 8,
        p: 1,
    }).toString("hex");

    return {
        salt,
        hash
    }
}
