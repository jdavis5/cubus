import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'
import { invariant } from 'src/common/invariant'

/**
 * Returns a summary for the `ACCOUNT_ACTIVATION` token that matches
 * the provided value.
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

    // The query ensures that expiresAt is non-null.
    invariant(record.expiresAt, 'Expected expiresAt to be non-null')

    return {
        ...record,
        expiresAt: record.expiresAt
    }
}
