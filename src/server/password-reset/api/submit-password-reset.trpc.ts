import prisma from 'prisma/main'
import { TokenSchema, UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { ApiTokenExpiredError } from 'src/server/common/api-errors'
import { generateHash } from 'src/server/common/hashing'
import { appPublicProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Submit a `PASSWORD_RESET` token
 */
export const submitPasswordReset = appPublicProcedure
    .input(
        z.object({
            userId: UserSchema.shape.id,
            token: TokenSchema.shape.value,
            newPassword: UserSchema.shape.password
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const summary = await prisma.token.findValidPasswordResetSummary(
                opts.input.token
            )
            if (!summary || summary.userId !== opts.input.userId) {
                throw new ApiTokenExpiredError()
            }
            await prisma.user.update({
                where: {
                    id: summary.userId
                },
                data: {
                    password: await generateHash(opts.input.newPassword)
                }
            })
            await prisma.token.removePasswordReset(summary.userId)
        })
    )
