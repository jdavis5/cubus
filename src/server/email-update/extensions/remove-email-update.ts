import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Removes all `EMAIL_UPDATE` tokens attached to the given user ID
 */
export const removeEmailUpdate = (userId: string) => {
    return prisma.token.deleteMany({
        where: {
            type: TokenOptions.EMAIL_UPDATE,
            userId
        }
    })
}
