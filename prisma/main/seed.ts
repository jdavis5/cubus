import { type Prisma } from './client'
import prisma from './index'

const writeStatus = (message: string) => {
    console.log(`🛠️  ${message}`)
}

const seedPlans = async () => {
    const plans: Array<Prisma.PlanCreateInput> = [
        { option: 'FREE', name: 'Free', limit: 2, price: '0.00' },
        { option: 'BASIC', name: 'Basic', limit: 4, price: '2.99' },
        { option: 'PRO', name: 'Pro', limit: 10, price: '4.99' }
    ]
    writeStatus('Seeding plan data')
    plans.forEach(async (plan) => {
        await prisma.plan.upsert({
            where: {
                option: plan.option
            },
            update: {},
            create: plan
        })
    })
}

const main = async () => {
    try {
        await seedPlans()
        await prisma.$disconnect()
    } catch (error) {
        console.error(error)
        await prisma.$disconnect()
        process.exit(1)
    }
}

main()
