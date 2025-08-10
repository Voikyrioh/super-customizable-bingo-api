import type { FastifyInstance } from 'fastify'
import { LoggedUser, type LoginForm, loginSchema } from "../../domain/entities/auth";
import { Router } from '../class/router'
import { JsonWebTokenManager } from "../class/json-web-token";
import { ulid } from "ulid";

/**
 * Authentication routes
 */
export default (instance: FastifyInstance) => {
    new Router(instance)
        .createRoute<LoginForm, {status: string}>(
            'post',
            'login',
            loginSchema,
            async (request, reply) => {
                const jwtm = await JsonWebTokenManager.getInstance()
                const token = await jwtm.signToken<LoggedUser>({
                    username: request.body.username,
                    permissions: [],
                    user_id: ulid()
                })

                return reply.status(200).header('Set-Cookie', token).send()
            }
        )
}
