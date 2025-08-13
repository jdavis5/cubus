import * as generated from './.generated/zod'

export * from './.generated/zod'

/**
 * Runtime-only custom fields can be added here
 * These fields are not part of the generated Prisma client and are applied at runtime
 */

/**
 * Extended ApiKey from the generated Prisma client
 */
export type ApiKey = generated.ApiKey & {
    maskedKey: string
}
