import type { FastifyInstance } from 'fastify'
import { z } from 'zod/v4'
import { Router } from '../class/router'
import { BearerToken } from '../class/security/bearer-token'

/**
 * Authentications routes
 */
export default (instance: FastifyInstance) => {
    new Router(instance, '/')
        .addSecurity(new BearerToken('token'))
        .createRoute<null, {status: string}>(
            'get',
            '',
            null,
            async () => { return { status: 'ok' } }
        )
        .createRoute<{myName: string}, string>(
            'post',
            '',
            z.object({myName: z.string()}),
            async (request) => { return `your name is ${request.body.myName}` }
        )
}
