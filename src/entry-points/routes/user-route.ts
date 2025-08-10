import type { FastifyInstance, FastifyRequest } from 'fastify'
import type { LoggedUser } from "../../domain/entities/auth";
import { Router } from '../class/router'
import { type AuthenticatedRequest, JWTToken } from "../class/security/jwt-token";

/**
 * Chat routes
 */
export default (instance: FastifyInstance) => {
    new Router(instance)
        .addSecurity(new JWTToken())
        .createRoute<null, LoggedUser, AuthenticatedRequest>(
            'get',
            'info',
            null,
            async (request) => {
                return request.authenticatedUser }
        )
}
