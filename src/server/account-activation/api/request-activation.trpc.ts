import prisma from 'prisma/main'
import { accountActivationMailer } from 'src/server/account-activation/account-activation.mailer'
import { ApiInternalError } from 'src/server/common/api-errors'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Create an `ACCOUNT_ACTIVATION` token
 */
export const requestActivation = appProtectedProcedure.mutation((opts) =>
    procedureResult(async () => {
        const record = await prisma.user.findUnique({
            where: {
                id: opts.ctx.session.user.id
            },
            select: {
                id: true,
                email: true
            }
        })
        if (!record) {
            throw new ApiInternalError()
        }
        const token = await prisma.token.createAccountActivation(record.id)
        await accountActivationMailer({
            email: record.email,
            token
        })
    })
)
