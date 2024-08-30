import prisma from 'prisma/main'
import { ApiKeySchema } from 'prisma/main/schemas'
import { z } from 'zod'
import {
    ApiAccessUnauthorizedError,
    ApiInternalError,
    ApiKeyLimitError
} from 'src/server/common/api-errors'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Toggle an API key on/off
 */
export const toggleKey = appProtectedProcedure
    .input(
        z.object({
            id: ApiKeySchema.shape.id,
            isEnabled: ApiKeySchema.shape.isEnabled
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
            if (opts.input.isEnabled) {
                const previewMap = new Map()
                summary.apiKeys.forEach(({ id, isEnabled }) => {
                    previewMap.set(id, isEnabled)
                })
                previewMap.set(opts.input.id, opts.input.isEnabled)
                const previewEntries = Array.from(previewMap)
                if (
                    previewEntries.filter(([_, value]) => value).length >
                    summary.plan.limit
                ) {
                    throw new ApiKeyLimitError()
                }
            }
            await prisma.apiKey.update({
                where: {
                    id: opts.input.id
                },
                data: {
                    isEnabled: opts.input.isEnabled
                }
            })
        })
    )
