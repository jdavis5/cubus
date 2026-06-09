import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'
import { invariant } from 'src/common/invariant'

/**
 * Returns a summary for the `PASWORD_RESET` token that matches
 * the provided value.
 */
export const findValidPasswordResetSummary = async (value: string) => {
    const record = await prisma.token.findFirst({
        where: {
            value,
            type: TokenOptions.PASSWORD_RESET,
            expiresAt: {
                gte: new Date()
            }
        },
        include: {
            user: {
                select: {
                    email: true
                }
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
