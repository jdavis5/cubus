import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Removes all `PASSWORD_RESET` tokens attached to the given user ID
 */
export const removePasswordReset = (userId: string) => {
    return prisma.token.deleteMany({
        where: {
            type: TokenOptions.ACCOUNT_ACTIVATION,
            userId
        }
    })
}
