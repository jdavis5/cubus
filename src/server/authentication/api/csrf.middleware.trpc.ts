import { verifyCsrf } from 'src/server/authentication/api/verify-csrf.helper'
import { t } from 'src/server/trpc.init'

/**
 * tRPC middleware that verifies the CSRF
 */
export const csrfMiddleware = t.middleware(async (opts) => {
    await verifyCsrf(opts.ctx.req)
    return opts.next(opts)
})
