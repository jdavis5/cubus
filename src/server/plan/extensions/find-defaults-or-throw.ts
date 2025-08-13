import prisma from 'prisma/main'

/**
 * Returns the default plan or throws a NotFoundError
 */
export const findDefaultsOrThrow = () => {
    return prisma.plan.findUniqueOrThrow({
        where: {
            option: 'FREE',
            isAvailable: true
        }
    })
}
