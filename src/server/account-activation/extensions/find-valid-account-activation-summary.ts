import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Returns a summary for the `ACCOUNT_ACTIVATION` token that matches
 * the provided value
 */
export const findValidAccountActivationSummary = async (value: string) => {
    const record = await prisma.token.findFirst({
        where: {
            value,
            type: TokenOptions.ACCOUNT_ACTIVATION,
            expiresAt: {
                gte: new Date()
            }
        }
    })
    if (!record) {
        return null
    }
    return {
        ...record,
        // Assert non-null properties
        expiresAt: record.expiresAt!
    }
}
