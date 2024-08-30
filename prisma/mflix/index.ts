import { PrismaClient } from './client'
import publicApi from 'src/public-api/public-api.mflix.extension'

/**
 * A global singleton is required to prevent multiple client instances
 * caused by hot reloading
 *
 * @see {@link https://github.com/prisma/prisma/discussions/4399}
 */
const client = globalThis.prisma_mflix || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma_mflix = client
}

const extendedClient = client.$extends(publicApi)

export default extendedClient
