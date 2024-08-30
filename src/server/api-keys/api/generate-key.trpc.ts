import prisma from 'prisma/main'
import { ApiKeySchema } from 'prisma/main/schemas'
import { z } from 'zod'
import {
    ApiInternalError,
    ApiKeyLimitError,
    ApiKeyNameError
} from 'src/server/common/api-errors'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Generate a new API key
 */
export const generateKey = appProtectedProcedure
    .input(
        z.object({
            name: ApiKeySchema.shape.name
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
            if (summary.apiKeys.length >= summary.plan.limit) {
                throw new ApiKeyLimitError()
            }
            const matchingKey = summary.apiKeys.find(
                (key) => key.name === opts.input.name
            )
            if (matchingKey) {
                throw new ApiKeyNameError()
            }
            const key = await prisma.apiKey.generate({
                userId: summary.userId,
                name: opts.input.name
            })
            return { key }
        })
    )
