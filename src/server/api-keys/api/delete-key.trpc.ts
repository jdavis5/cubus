import prisma from 'prisma/main'
import { ApiKeySchema } from 'prisma/main/schemas'
import { z } from 'zod'
import {
    ApiAccessUnauthorizedError,
    ApiInternalError
} from 'src/server/common/api-errors'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Delete an API key
 */
export const deleteKey = appProtectedProcedure
    .input(
        z.object({
            id: ApiKeySchema.shape.id
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const summary = await prisma.user.createSubscriptionSummary(
                opts.ctx.session.user.id
            )
            if (!summary) {
                throw new ApiInternalError()
            }
            const isOwned = summary.apiKeys.find(
                (ownedKey) => ownedKey.id === opts.input.id
            )
            if (!isOwned) {
                throw new ApiAccessUnauthorizedError()
            }
            return prisma.apiKey.delete({
                where: {
                    id: opts.input.id
                }
            })
        })
    )
