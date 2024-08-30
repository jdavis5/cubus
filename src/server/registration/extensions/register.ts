import prisma from 'prisma/main'
import { PlanOptions } from 'prisma/main/client'
import { generateHash } from 'src/server/common/hashing'

type RegisterArgs = {
    firstName: string
    surname: string
    password: string
    email: string
}

/**
 * Registers a new user with the provided information with a default plan
 */
export const register = async (data: RegisterArgs) => {
    return prisma.user.create({
        data: {
            ...data,
            password: await generateHash(data.password),
            subscription: {
                create: {
                    plan: {
                        connect: {
                            option: PlanOptions.FREE
                        }
                    }
                }
            }
        }
    })
}
