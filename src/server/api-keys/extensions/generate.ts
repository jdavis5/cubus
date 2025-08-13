import prisma from 'prisma/main'
import { generateApiKey, signApiKey } from 'src/server/api-keys/api-keys.tokens'

type GenerateArgs = {
    userId: string
    name: string
}

/**
 * Generates an API key for the provided user
 */
export const generate = async (data: GenerateArgs) => {
    const unsignedKey = generateApiKey()
    await prisma.apiKey.create({
        data: {
            ...data,
            value: signApiKey(unsignedKey),
            lastFourChars: unsignedKey.slice(-4)
        }
    })
    return unsignedKey
}
