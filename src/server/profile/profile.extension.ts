import { Prisma } from 'prisma/main/client'
import { findProfileOrThrow } from './extensions/find-profile-or-throw'

export default Prisma.defineExtension({
    name: 'profile.extension',
    model: {
        user: {
            findProfileOrThrow
        }
    }
})
