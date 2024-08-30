import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'

/**
 *  Deletes any `SESSION` token with the provided session ID
 */
export const deleteSession = async (token: string) => {
    return prisma.token.deleteMany({
        where: {
            value: token,
            type: TokenOptions.SESSION
        }
    })
}
