import { PrismaClient } from './client'
import publicApi from 'src/public-api/public-api.main.extension'
import server from 'src/server/server.main.extension'

/**
 * A global singleton is required to prevent multiple client instances
 * caused by hot reloading
 *
 * @see {@link https://github.com/prisma/prisma/discussions/4399}
 */
const client = globalThis.prisma_main || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
    globalThis.prisma_main = client
}

const extendedClient = client.$extends(publicApi).$extends(server)

export default extendedClient
