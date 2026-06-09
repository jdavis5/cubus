import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'
import { invariant } from 'src/common/invariant'

/**
 * Returns a summary for the `EMAIL_UPDATE` token that matches
 * the provided value.
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
                    not: null
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

    if (!record) {
        return null
    }

    // The query ensures that expiresAt is non-null.
    invariant(record.expiresAt, 'Expected expiresAt to be non-null')

    // The query ensures that unconfirmedEmail is non-null.
    invariant(
        record.user.unconfirmedEmail,
        'Expected unconfirmedEmail to be non-null'
    )

    return {
        ...record,
        expiresAt: record.expiresAt,
        user: {
            ...record.user,
            unconfirmedEmail: record.user.unconfirmedEmail
        }
    }
}
