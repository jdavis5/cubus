import { AccountOptions } from 'prisma/main/client'
import { z } from 'zod'

/**
 * Available options for authenticating
 */
const authOptions = {
    PASSWORD: 'password'
} as const

const authOptionsSchema = z.nativeEnum(authOptions)

export type AuthOptions = z.infer<typeof authOptionsSchema>

/**
 * Get the Authentication method for a given option
 */
export const getAuthMethod = (option: AccountOptions): AuthOptions => {
    let authMethod: AuthOptions
    switch (option) {
        case AccountOptions.BASIC: {
            authMethod = authOptions.PASSWORD
            break
        }
        default: {
            authMethod = authOptions.PASSWORD
        }
    }
    return authMethod
}
