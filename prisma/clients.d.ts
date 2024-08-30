import { type PrismaClient as PrimaryClient } from './main/client'
import { type PrismaClient as MflixClient } from './mflix/client'

declare global {
    var prisma_main: PrimaryClient
    var prisma_mflix: MflixClient
}
