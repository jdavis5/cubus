import prisma from 'prisma/main'

/**
 * Returns a subscription summary for a given user ID
 *
 * The summary includes:
 * - All API keys attached to the user account
 * - The plan attached to the user account
 */
export const createSubscriptionSummary = async (userId: string) => {
    const record = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            apiKeys: {
                orderBy: [
                    { isEnabled: 'desc' },
                    { lastUsedAt: 'desc' },
                    { generatedAt: 'desc' }
                ]
            },
            subscription: {
                select: {
                    plan: true
                }
            }
        }
    })
    if (!record || !record.subscription) {
        return null
    }
    return {
        userId: record.id,
        apiKeys: record.apiKeys,
        plan: record.subscription.plan
    }
}
