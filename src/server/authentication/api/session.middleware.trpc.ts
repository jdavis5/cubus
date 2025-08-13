import prisma from 'prisma/main'
import { getSessionFromCookies } from 'src/server/authentication/session.cookies'
import {
    ApiAccessUnauthorizedError,
    ApiUnauthenticatedError
} from 'src/server/common/api-errors'
import { t } from 'src/server/trpc.init'

/**
 * tRPC middleware that verifies that there is a valid session
 * and attaches it to `ctx` if available
 */
export const attachSessionCtxMiddleware = t.middleware(async (opts) => {
    const token = getSessionFromCookies(opts.ctx.req.cookies)
    if (!token) {
        throw new ApiUnauthenticatedError('one')
    }
    const user = await prisma.token.findValidSession(token)
    if (!user) {
        throw new ApiAccessUnauthorizedError()
    }
    return opts.next({
        ctx: {
            session: {
                user
            }
        }
    })
})
