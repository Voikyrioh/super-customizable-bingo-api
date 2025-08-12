import { HttpCodes } from "@errors/http.error";
import type { FastifyInstance } from 'fastify'
import { type LoginEntity, loginSchema, type RegistrationEntity } from "../../domain/entities/authentication";
import { logInUseCase } from "../../domain/usecases/log-in/log-in.usecase";
import { signUpUseCase } from "../../domain/usecases/sign-up/sign-up.usecase";
import { Router } from '../class/router'
import { registrationValidation } from "../validation/authentication.validator";

/**
 * Authentication routes
 */
export default (instance: FastifyInstance) => {
    new Router(instance)
        .createRoute<LoginEntity, void>(
            'post',
            'login',
            loginSchema,
            async (request, reply) => {
                const token = await logInUseCase(request.body)

                return reply.status(200).send({token})
            }
        ).createRoute<RegistrationEntity, void>(
            'post',
            'signup',
            registrationValidation,
            async (request, reply) => {
                await signUpUseCase(request.body)

               return reply.status(HttpCodes.CREATED).send()
            }
        )
}
