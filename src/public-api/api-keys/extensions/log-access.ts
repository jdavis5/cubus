import prisma from 'prisma/main'

/**
 * Logs API key access
 */
export const logAccess = (keyId: string) => {
    return prisma.apiKey.update({
        where: {
            id: keyId
        },
        data: {
            lastUsedAt: new Date()
        }
    })
}
