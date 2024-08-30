import prisma from 'prisma/main'
import { TokenSchema, UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { destroySession } from 'src/server/authentication/api/destroy-session.helper'
import {
    ApiIncorrectPasswordError,
    ApiTokenExpiredError
} from 'src/server/common/api-errors'
import { compareHash } from 'src/server/common/hashing'
import { appPublicProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Submit an `EMAIL_UPDATE` token
 */
export const submitEmailUpdate = appPublicProcedure
    .input(
        z.object({
            userId: UserSchema.shape.id,
            token: TokenSchema.shape.value,
            password: z.string()
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const summary = await prisma.token.findValidEmailUpdateSummary(
                opts.input.token
            )
            if (!summary) {
                throw new ApiTokenExpiredError()
            }
            const existingUser = await prisma.user.findFirst({
                where: {
                    email: summary.user.unconfirmedEmail
                }
            })
            if (existingUser) {
                throw new ApiTokenExpiredError()
            }
            const isMatch = await compareHash(
                opts.input.password,
                summary.user.password
            )
            if (!isMatch) {
                throw new ApiIncorrectPasswordError()
            }
            await prisma.user.update({
                where: {
                    id: summary.userId
                },
                data: {
                    unconfirmedEmail: null,
                    email: summary.user.unconfirmedEmail
                }
            })
            await prisma.token.removeEmailUpdate(summary.userId)
            await destroySession(opts.ctx.req, opts.ctx.res)
        })
    )
