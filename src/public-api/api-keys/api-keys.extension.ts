import { Prisma } from 'prisma/main/client'
import { findByToken } from './extensions/find-by-token'
import { logAccess } from './extensions/log-access'

export default Prisma.defineExtension({
    name: 'public-api.api-keys.extension',
    model: {
        token: {
            findByToken,
            logAccess
        }
    }
})
