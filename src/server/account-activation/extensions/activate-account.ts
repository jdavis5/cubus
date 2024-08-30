import prisma from 'prisma/main'

/**
 * Activates an account with the given user ID
 */
export const activateAccount = (userId: string) => {
    return prisma.user.update({
        where: {
            id: userId
        },
        data: {
            emailVerifiedAt: new Date()
        }
    })
}
