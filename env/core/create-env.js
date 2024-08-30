import { z } from 'zod'

/**
 * A schema
 * @typedef {z.ZodRawShape} Schema
 */

/**
 * The valid runtime values
 * @typedef {string | boolean | number | undefined} RuntimeValues
 */

/**
 * Enforces that a schema has prefixed keys
 * @template T
 * @template {string} Prefix
 * @typedef {keyof T extends `${Prefix}${string}`
 *   ? T
 *   : `Prefix should be ${Prefix}`
 * } PrefixedSchema
 */

/**
 * Maps schema keys to valid runtime values
 * @template {Schema} T
 * @typedef {{ [K in keyof T]: RuntimeValues }} Runtime
 */

/**
 * Creates an environment for a context using a schema
 * @template {Schema} T
 * @param {{
 *   context: 'server',
 *   schema: T
 * } | {
 *   context: 'client',
 *   schema: PrefixedSchema<T, 'NEXT_PUBLIC_'>,
 *   runtime: Runtime<T>
 * }} options
 * @returns {z.infer<z.ZodObject<T>>}
 */
export function createEnv(options) {
    const onAccessError = () => {
        throw new Error(
            `❌ Attempting to access a '${options.context}' environment variable from the wrong context`
        )
    }

    if (options.context === 'server' && typeof window !== 'undefined') {
        return onAccessError()
    }

    /**
     * @param {z.ZodError} error
     */
    const onValidationError = (error) => {
        console.error(`❌ Invalid environment options for '${options.context}'`)
        console.error(error.flatten().fieldErrors)
        throw new Error('Invalid environment options')
    }

    /**
     * @template {z.AnyZodObject} T
     * @param {T} schema
     * @returns {z.infer<T>}
     */
    const createFromSchema = (schema) => {
        const runtime =
            'runtime' in options ? options.runtime : process.env ?? {}
        const parsed = schema.safeParse(runtime)
        if (!parsed.success) {
            return onValidationError(parsed.error)
        }
        return parsed.data
    }

    const schema = z.object(/** @type {T} */ (options.schema))
    return createFromSchema(schema)
}
