import { destroySession } from 'src/server/authentication/api/destroy-session.helper'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Logs out a user
 */
export const logoutUser = appProtectedProcedure.mutation((opts) =>
    procedureResult(async () => {
        await destroySession(opts.ctx.req, opts.ctx.res)
    })
)
