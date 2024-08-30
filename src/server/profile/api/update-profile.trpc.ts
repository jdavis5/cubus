import prisma from 'prisma/main'
import { type Prisma } from 'prisma/main/client'
import { UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Update the user profile
 */
export const updateProfile = appProtectedProcedure
    .input(
        z
            .object({
                firstName: UserSchema.shape.firstName,
                surname: UserSchema.shape.surname
            })
            .partial()
    )
    .mutation((opts) =>
        procedureResult(async () => {
            await prisma.user.update({
                where: {
                    id: opts.ctx.session.user.id
                },
                data: opts.input satisfies Prisma.UserUpdateInput
            })
        })
    )
