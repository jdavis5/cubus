import prisma from 'prisma/main'
import { UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { ApiEmailNotFoundError } from 'src/server/common/api-errors'
import { passwordResetMailer } from 'src/server/password-reset/password-reset.mailer'
import { appPublicProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Create a `PASSWORD_RESET` token.
 */
export const requestPasswordReset = appPublicProcedure
    .input(
        z.object({
            email: UserSchema.shape.email
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const record = await prisma.user.findUnique({
                where: {
                    email: opts.input.email
                },
                select: {
                    id: true
                }
            })

            if (!record) {
                throw new ApiEmailNotFoundError()
            }

            const token = await prisma.token.createPasswordReset(record.id)

            await passwordResetMailer({
                email: opts.input.email,
                token
            })
        })
    )
