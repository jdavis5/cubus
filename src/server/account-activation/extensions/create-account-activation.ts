import { addSeconds } from 'date-fns'
import prisma from 'prisma/main'
import { TokenOptions } from 'prisma/main/client'
import { generateAccountActivationToken } from 'src/server/account-activation/account-activation.tokens'

/**
 * Creates an `ACCOUNT_ACTIVATION` token for the user with given ID
 */
export const createAccountActivation = async (userId: string) => {
    const value = generateAccountActivationToken()
    await prisma.token.create({
        data: {
            userId,
            type: TokenOptions.ACCOUNT_ACTIVATION,
            value,
            expiresAt: addSeconds(new Date(), 60 * 30)
        }
    })
    return value
}
