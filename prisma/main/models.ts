import { type Prisma } from './client'
import { type ApiKey as BaseApiKey } from './generated/zod'

export * from './generated/zod'

/**
 * An extended ApiKey shape.
 */
export type ApiKey = BaseApiKey & {
    maskedKey: string
}

/**
 * A Prisma select object to create a Profile shape.
 */
export const profileSelect = {
    id: true,
    firstName: true,
    surname: true,
    email: true
} satisfies Prisma.UserSelect

/**
 * The Profile shape.
 */
export type Profile = Prisma.UserGetPayload<{
    select: typeof profileSelect
}>
