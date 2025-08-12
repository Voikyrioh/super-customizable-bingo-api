import Logger from '@logger'
import type { FastifyInstance, FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify'
import type { RouteShorthandOptions } from 'fastify/types/route'
import type { ZodError, ZodType } from 'zod/v4'
import type { BaseSecurity } from './security/base-security'

const bodylessMethod = ['delete', 'get']
export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch'
type CustomRequest<B, Request> = FastifyRequest<{Body: B}> & Request
type RouteHandler<Body, Request extends Record<string, unknown>, ResponseBody> = (request: CustomRequest<Body, Request>, reply: FastifyReply) => Promise<ResponseBody> | ResponseBody

/**
 * Custom router for simplification of a global route integration with shared security
 */
export class Router {
    #fastifyInstance: FastifyInstance

    constructor(fastifyInstance: FastifyInstance) {
        this.#fastifyInstance = fastifyInstance
    }

    createRoute<Body, Resp, CustomRequest extends Record<string, unknown> = {}>(method: Method, path: string, bodyValidationSchema: ZodType<Body>|null, handler: RouteHandler<Body, CustomRequest, Resp>): Router {
        const ops: RouteShorthandOptions = {}
        if (bodyValidationSchema && !bodylessMethod.includes(method)) ops.preValidation = (request, _, done) => {
            try {
                request.body = bodyValidationSchema.parse(request.body)
                done()
            } catch (e) {
                done(e as ZodError)
            }
        }

        this.#fastifyInstance[method](path, ops, handler as RouteHandlerMethod)
        return this
    }

    addSecurity(security: BaseSecurity): Router {
        this.#fastifyInstance.addHook('preHandler', (request, reply, done) => {
            try {
                security.securityFn(request, reply).then((value) => {
                    if (value) {
                        Logger.warn(`Rejected request [${request.method} - ${request.originalUrl}]  with security ${security.securityName}. rejected message : ${value.message}`)
                        reply.status(value.status).send({ message: value.message, context: value.context })
                        done()
                    }
                    else done()
                })
            } catch (e) {
                done(e as Error)
            }
        })
        return this;
    }
}
