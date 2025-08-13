import prisma from 'prisma/main'
import { TokenSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { saveSession } from 'src/server/authentication/api/save-session.helper'
import { ApiTokenExpiredError } from 'src/server/common/api-errors'
import { appPublicProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Submit an `ACCOUNT_ACTIVATION` token
 */
export const submitActivation = appPublicProcedure
    .input(
        z.object({
            userId: TokenSchema.shape.userId,
            token: TokenSchema.shape.value
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const summary =
                await prisma.token.findValidAccountActivationSummary(
                    opts.input.token
                )
            if (!summary || summary.userId !== opts.input.userId) {
                throw new ApiTokenExpiredError()
            }
            await prisma.user.activateAccount(summary.userId)
            await prisma.token.removeAccountActivation(summary.userId)
            await saveSession(opts.ctx.req, opts.ctx.res, summary.userId)
        })
    )
