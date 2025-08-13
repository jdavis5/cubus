import { addSeconds } from 'date-fns'
import { nanoid } from 'nanoid'
import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Creates a new `SESSION` token for the provided user ID
 */
export const createSession = async (userId: string) => {
    const value = nanoid()
    await prisma.$transaction([
        prisma.token.create({
            data: {
                userId,
                value,
                type: TokenOptions.SESSION,
                expiresAt: addSeconds(new Date(), 60 * 60 * 24 * 7)
            }
        }),
        prisma.user.update({
            where: {
                id: userId
            },
            data: {
                lastLoginAt: new Date()
            }
        })
    ])
    return value
}
