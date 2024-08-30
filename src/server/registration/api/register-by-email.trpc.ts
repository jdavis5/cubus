import prisma from 'prisma/main'
import { UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { saveSession } from 'src/server/authentication/api/save-session.helper'
import { ApiEmailNotAvailableError } from 'src/server/common/api-errors'
import { appPublicProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Register an account using email
 */
export const registerByEmail = appPublicProcedure
    .input(
        z.object({
            email: UserSchema.shape.email,
            password: UserSchema.shape.password,
            firstName: UserSchema.shape.firstName,
            surname: UserSchema.shape.surname
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const record = await prisma.user.findUnique({
                where: {
                    email: opts.input.email
                }
            })
            if (record) {
                throw new ApiEmailNotAvailableError()
            }
            const user = await prisma.user.register(opts.input)
            await saveSession(opts.ctx.req, opts.ctx.res, user.id)
        })
    )
