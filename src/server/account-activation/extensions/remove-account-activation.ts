import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 * Removes all `ACCOUNT_ACTIVATION` tokens attached to the given user ID
 */
export const removeAccountActivation = (userId: string) => {
    return prisma.token.deleteMany({
        where: {
            type: TokenOptions.ACCOUNT_ACTIVATION,
            userId
        }
    })
}
