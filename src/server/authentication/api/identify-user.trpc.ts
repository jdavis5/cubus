import prisma from 'prisma/main'
import { UserSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import { getAuthMethod } from 'src/common/authentication/auth-options'
import { ApiAccountNotFoundError } from 'src/server/common/api-errors'
import { appPublicProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Identifies an authentication method for a user
 */
export const identifyUser = appPublicProcedure
    .input(
        z.object({
            identifier: UserSchema.shape.email
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const record = await prisma.user.findUnique({
                where: {
                    email: opts.input.identifier
                },
                select: {
                    id: true,
                    accountType: true
                }
            })
            if (!record) {
                throw new ApiAccountNotFoundError()
            }
            return {
                method: getAuthMethod(record.accountType)
            }
        })
    )
