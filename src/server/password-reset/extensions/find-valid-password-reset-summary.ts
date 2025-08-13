import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Returns a summary for the `PASWORD_RESET` token that matches
 * the provided value
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
    return {
        ...record,
        // Assert non-null properties
        expiresAt: record.expiresAt!
    }
}
