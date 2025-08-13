import prisma from 'prisma/main'

/**
 * Returns profile data for a user and throws if it does not exist
 */
export const findProfileOrThrow = async (id: string) => {
    return prisma.user.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            firstName: true,
            surname: true,
            email: true
        }
    })
}
