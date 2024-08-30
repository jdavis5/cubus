import prisma from 'prisma/main'

/**
 * Finds a list of available plans
 */
export const listAvailable = () => {
    return prisma.plan.findMany({
        where: {
            isAvailable: true
        },
        orderBy: {
            price: 'asc'
        }
    })
}
