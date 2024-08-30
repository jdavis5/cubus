import * as generated from './.generated/zod'

export * from './.generated/zod'

/**
 * Add virtual keys here
 */
export type ApiKey = generated.ApiKey & { maskedKey: string }
