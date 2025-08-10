import { ErrorsCodes, HttpCodes, HttpError } from '@errors/http.error'
import Logger from "@logger";
import type { FastifyReply, FastifyRequest } from 'fastify'
import { verifyLoggedUserUseCase } from "../../../domain/usecases/verify-logged-user/verify-logged-user.use-case";
import { BaseSecurity } from './base-security'

/**
 * Security for enforcing jwt
 */
export class JWTToken extends BaseSecurity {

    constructor() {
        super('JWTToken')
    }

    async securityFn(request: FastifyRequest, reply: FastifyReply): Promise<HttpError|null> {
        const requestAuthorization = request.headers.authorization
        if (!requestAuthorization) {
            reply.header('WWW-Authenticate', `Bearer realm="${this.securityName}, error="invalid_request", error_description="Missing authorization header"`)
            return new HttpError(HttpCodes.BAD_REQUEST, ErrorsCodes.BAD_REQUEST, {error: 'Missing authorization header'})
        }
        const [type, token] = requestAuthorization.split(' ')

        if (type === 'Bearer' && token) {
            try {
                const authenticatedUser = await verifyLoggedUserUseCase(token)
                Object.assign(request, {authenticatedUser})
                return null
            } catch ( e ) {
                Logger.warn(e)
                reply.header('WWW-Authenticate', `Bearer realm="${this.securityName}, error="invalid_token", error_description="Missing authorization header"`)
                return new HttpError(HttpCodes.UNAUTHORIZED, ErrorsCodes.UNAUTHORIZED, {error: 'Invalid token'})
            }
        }

        reply.header('WWW-Authenticate', `Bearer realm="${this.securityName}, error="invalid_request", error_description="Invalid authorization header"`)
        return new HttpError(HttpCodes.BAD_REQUEST, ErrorsCodes.BAD_REQUEST, {error: 'Invalid authorization header'})
    }

}
