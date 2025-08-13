import { addSeconds } from 'date-fns'
import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'
import { generatePasswordResetToken } from 'src/server/password-reset/password-reset.tokens'

/**
 * Creates an `PASSWORD_RESET` token for the user with given ID
 */
export const createPasswordReset = async (userId: string) => {
    const value = generatePasswordResetToken()
    await prisma.token.create({
        data: {
            userId,
            type: TokenOptions.PASSWORD_RESET,
            value,
            expiresAt: addSeconds(new Date(), 60 * 10)
        }
    })
    return value
}
