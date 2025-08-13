import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Returns a summary for the `EMAIL_UPDATE` token that matches
 * the provided value
 */
export const findValidEmailUpdateSummary = async (value: string) => {
    const record = await prisma.token.findFirst({
        where: {
            value,
            type: TokenOptions.EMAIL_UPDATE,
            expiresAt: {
                gte: new Date()
            },
            user: {
                unconfirmedEmail: {
                    not: undefined
                }
            }
        },
        include: {
            user: {
                select: {
                    password: true,
                    unconfirmedEmail: true
                }
            }
        }
    })
    if (!record || !record.user.unconfirmedEmail) {
        return null
    }
    return {
        ...record,
        // Assert non-null properties
        expiresAt: record.expiresAt!,
        user: {
            ...record.user,
            unconfirmedEmail: record.user.unconfirmedEmail!
        }
    }
}
