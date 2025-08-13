import prisma from 'prisma/main'
import { type PlanOptions } from 'prisma/main/client'

/**
 * Returns all available plans
 */
export const findAvailable = (option: PlanOptions) => {
    return prisma.plan.findUnique({
        where: {
            option,
            isAvailable: true
        }
    })
}
