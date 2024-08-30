import { Prisma } from 'prisma/main/client'
import { findAvailable } from './extensions/find-available'
import { findDefaultsOrThrow } from './extensions/find-defaults-or-throw'
import { listAvailable } from './extensions/list-available'

export default Prisma.defineExtension({
    name: 'plan.extension',
    model: {
        plan: {
            findDefaultsOrThrow,
            findAvailable,
            listAvailable
        }
    }
})
