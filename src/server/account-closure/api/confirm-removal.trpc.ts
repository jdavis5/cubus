import prisma from 'prisma/main'
import { z } from 'zod'
import { destroySession } from 'src/server/authentication/api/destroy-session.helper'
import {
    ApiIncorrectPasswordError,
    ApiInternalError
} from 'src/server/common/api-errors'
import { compareHash } from 'src/server/common/hashing'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Remove a user account
 */
export const confirmRemoval = appProtectedProcedure
    .input(
        z.object({
            password: z.string()
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
            await prisma.user.delete({
                where: {
                    id: record.id
                }
            })
            await destroySession(opts.ctx.req, opts.ctx.res)
        })
    )
