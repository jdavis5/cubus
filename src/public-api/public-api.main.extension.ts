import { Prisma } from 'prisma/main/client'
import apiKeys from './api-keys/api-keys.extension'

export default Prisma.defineExtension((client) => {
    return client.$extends(apiKeys)
})
