import { addSeconds } from 'date-fns'
import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'
import { generateEmailUpdateToken } from 'src/server/email-update/email-update.tokens'

/**
 * Creates an `EMAIL_UPDATE` token for the user with given ID
 */
export const createEmailUpdate = async (userId: string) => {
    const value = generateEmailUpdateToken()
    await prisma.token.create({
        data: {
            userId,
            type: TokenOptions.EMAIL_UPDATE,
            value,
            expiresAt: addSeconds(new Date(), 60 * 30)
        }
    })
    return value
}
