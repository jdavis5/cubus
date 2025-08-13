import prisma from 'prisma/main'
import { UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { saveSession } from 'src/server/authentication/api/save-session.helper'
import {
    ApiIncorrectPasswordError,
    ApiInternalError
} from 'src/server/common/api-errors'
import { compareHash } from 'src/server/common/hashing'
import { appPublicProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Log a user in
 */
export const loginUser = appPublicProcedure
    .input(
        z.object({
            email: UserSchema.shape.email,
            password: z.string()
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const record = await prisma.user.findUnique({
                where: {
                    email: opts.input.email
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
            await saveSession(opts.ctx.req, opts.ctx.res, record.id)
        })
    )
