import prisma from 'prisma/main'
import { profileSelect } from 'prisma/main/models'

/**
 * Returns profile data for a user and throws if it does not exist.
 */
export const findProfileOrThrow = async (id: string) => {
    return prisma.user.findUniqueOrThrow({
        where: {
            id
        },
        select: profileSelect
    })
}
