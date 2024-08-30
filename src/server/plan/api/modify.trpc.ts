import prisma from 'prisma/main'
import { ApiKeySchema, PlanOptionsSchema } from 'prisma/main/schemas'
import { z } from 'zod'
import {
    ApiAccessUnauthorizedError,
    ApiInternalError,
    ApiKeyLimitError
} from 'src/server/common/api-errors'
import { appProtectedProcedure, procedureResult } from 'src/server/trpc.app'

/**
 * Modify a subscription by changing the plan option and updating keys
 */
export const modify = appProtectedProcedure
    .input(
        z.object({
            planOption: PlanOptionsSchema,
            keys: z.array(
                z.object({
                    id: ApiKeySchema.shape.id,
                    isEnabled: ApiKeySchema.shape.isEnabled
                })
            )
        })
    )
    .mutation((opts) =>
        procedureResult(async () => {
            const availablePlan = await prisma.plan.findAvailable(
                opts.input.planOption
            )
            if (!availablePlan) {
                throw new ApiInternalError()
            }
            const summary = await prisma.user.createSubscriptionSummary(
                opts.ctx.session.user.id
            )
            if (!summary) {
                throw new ApiInternalError()
            }
            const isOwned = opts.input.keys.every((inputKey) =>
                summary.apiKeys.find((ownedKey) => ownedKey.id === inputKey.id)
            )
            if (!isOwned) {
                throw new ApiAccessUnauthorizedError()
            }
            const previewMap = new Map()
            summary.apiKeys.forEach(({ id, isEnabled }) => {
                previewMap.set(id, isEnabled)
            })
            opts.input.keys.forEach(({ id, isEnabled }) => {
                previewMap.set(id, isEnabled)
            })
            const previewEntries = Array.from(previewMap)
            if (
                previewEntries.filter(([_, value]) => value).length >
                summary.plan.limit
            ) {
                throw new ApiKeyLimitError()
            }
            const record = await prisma.user.update({
                where: {
                    id: summary.userId
                },
                data: {
                    subscription: {
                        update: {
                            plan: {
                                connect: {
                                    option: opts.input.planOption
                                }
                            }
                        }
                    },
                    apiKeys: {
                        update: opts.input.keys.map((item) => ({
                            where: {
                                id: item.id
                            },
                            data: {
                                isEnabled: item.isEnabled
                            }
                        }))
                    }
                },
                select: {
                    id: true,
                    subscription: {
                        select: {
                            plan: true
                        }
                    },
                    apiKeys: true
                }
            })
            return {
                userId: record.id,
                apiKeys: record.apiKeys,
                // Assert non-null properties
                plan: record.subscription!.plan
            }
        })
    )
