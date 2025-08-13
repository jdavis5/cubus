import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Retrieves session user data from a valid session ID
 */
export const findValidSession = async (token: string) => {
    if (!token) {
        return null
    }
    const record = await prisma.token.findFirst({
        where: {
            value: token,
            type: TokenOptions.SESSION
        },
        select: {
            expiresAt: true,
            user: {
                select: {
                    id: true,
                    firstName: true,
                    roles: true,
                    lastLoginAt: true,
                    email: true,
                    emailVerifiedAt: true
                }
            }
        }
    })
    if (!record) {
        return null
    }
    if (record.expiresAt && new Date() >= record.expiresAt) {
        return null
    }
    return record.user
}
