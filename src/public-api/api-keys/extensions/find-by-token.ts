import prisma from 'prisma/main'
import { signApiKey } from 'src/server/api-keys/api-keys.tokens'

/**
 * Finds an API key from an unsigned token
 */
export const findByToken = async (token: string) => {
    return prisma.apiKey.findUnique({
        where: {
            value: signApiKey(token)
        }
    })
}
