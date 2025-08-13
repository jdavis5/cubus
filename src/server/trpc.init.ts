import { TRPCError, initTRPC } from '@trpc/server'
import SuperJSON from 'superjson2'
import {
    ApiAccessUnauthorizedError,
    ApiError,
    ApiUnauthenticatedError
} from 'src/server/common/api-errors'
import { type Context } from 'src/server/trpc.context'

export const t = initTRPC.context<Context>().create({
    transformer: SuperJSON,
    errorFormatter(opts) {
        const { shape, error } = opts
        if (error.cause instanceof ApiError) {
            if (error.cause instanceof ApiUnauthenticatedError) {
                throw new TRPCError({
                    code: 'UNAUTHORIZED',
                    message: error.cause.message
                })
            }
            if (error.cause instanceof ApiAccessUnauthorizedError) {
                throw new TRPCError({
                    code: 'FORBIDDEN',
                    message: error.cause.message
                })
            }
        }
        return shape
    }
})
