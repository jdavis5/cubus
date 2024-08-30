import prisma from 'prisma/main'
import { UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { ApiEmailNotAvailableError } from 'src/server/common/api-errors'
import { emailUpdateMailer } from 'src/server/email-update/email-update.mailer'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Create an `EMAIL_UPDATE` token
 */
export const requestEmailUpdate = appProtectedProcedure
    .input(
        z.object({
            newEmail: UserSchema.shape.email
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const record = await prisma.user.findFirst({
                where: {
                    email: opts.input.newEmail
                }
            })
            if (record) {
                throw new ApiEmailNotAvailableError()
            }
            await prisma.user.update({
                where: {
                    id: opts.ctx.session.user.id
                },
                data: {
                    unconfirmedEmail: opts.input.newEmail
                }
            })
            const token = await prisma.token.createEmailUpdate(
                opts.ctx.session.user.id
            )
            await emailUpdateMailer({
                email: opts.input.newEmail,
                token
            })
        })
    )
