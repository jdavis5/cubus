import { Prisma } from 'prisma/main/client'
import { createSubscriptionSummary } from './extensions/create-subscription-summary'

export default Prisma.defineExtension({
    name: 'subscription-summary.extension',
    model: {
        user: {
            createSubscriptionSummary
        }
    }
})
