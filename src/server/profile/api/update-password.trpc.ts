import prisma from 'prisma/main'
import { UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { destroySession } from 'src/server/authentication/api/destroy-session.helper'
import {
    ApiIncorrectPasswordError,
    ApiInternalError
} from 'src/server/common/api-errors'
import { compareHash, generateHash } from 'src/server/common/hashing'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Update the user password
 */
export const updatePassword = appProtectedProcedure
    .input(
        z.object({
            password: z.string(),
            newPassword: UserSchema.shape.password
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const record = await prisma.user.findUnique({
                where: {
                    id: opts.ctx.session.user.id
                },
                select: {
                    id: true,
                    password: true
                }
            })
            if (!record) {
                throw new ApiInternalError()
            }
            const isMatch = await compareHash(
                opts.input.password,
                record.password
            )
            if (!isMatch) {
                throw new ApiIncorrectPasswordError()
            }
            await prisma.user.update({
                where: {
                    id: record.id
                },
                data: {
                    password: await generateHash(opts.input.newPassword)
                }
            })
            await destroySession(opts.ctx.req, opts.ctx.res)
        })
    )
