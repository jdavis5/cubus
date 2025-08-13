import { z } from 'zod'

/**
 * A shape representing a Zod schema object.
 *
 * @typedef {z.ZodRawShape} Schema
 */

/**
 * Valid runtime value types.
 *
 * @typedef {string | boolean | number | undefined} RuntimeValues
 */

/**
 * Ensures that schema keys are prefixed with a given string.
 *
 * @template T
 * @template {string} Prefix
 * @typedef {keyof T extends `${Prefix}${string}`
 *   ? T
 *   : `Prefix should be ${Prefix}`
 * } PrefixedSchema
 */

/**
 * Maps each schema key to a valid runtime value type.
 *
 * @template {Schema} T
 * @typedef {{ [K in keyof T]: RuntimeValues }} Runtime
 */

/**
 * Configuration options for creating a validated environment object.
 *
 * @template {Schema} T
 * @typedef {{
 *   context: 'server',
 *   schema: T
 * } | {
 *   context: 'client',
 *   schema: PrefixedSchema<T, 'NEXT_PUBLIC_'>,
 *   runtime: Runtime<T>
 * }} EnvOptions
 */

/**
 * Creates a typed and validated environment object based on the given schema and context.
 *
 * @template {Schema} T The Zod schema shape object defining expected environment variables.
 * @param {EnvOptions<T>} options The environment configuration options.
 * @returns {z.infer<z.ZodObject<T>>} The validated environment object.
 */
export function createEnv(options) {
    /**
     * Throws an error when accessing environment variables from the wrong context.
     *
     * @throws {Error} Always throws.
     */
    const onAccessError = () => {
        throw new Error(
            `❌ Attempting to access a '${options.context}' environment variable from the wrong context`
        )
    }

    /**
     * Logs detailed Zod validation errors and halts execution.
     *
     * @param {z.ZodError} error The Zod validation error.
     * @throws {Error} Always throws after logging the validation errors.
     * @returns {never}
     */
    const onValidationError = (error) => {
        console.error(`❌ Invalid environment options for '${options.context}'`)
        console.error(error.flatten().fieldErrors)
        throw new Error('Invalid environment options')
    }

    /**
     * Creates a validated environment configuration object for the specified context
     * by validating environment variables against a provided Zod schema.
     *
     * If validation fails, or if environment variables are accessed from the wrong context,
     * an appropriate error will be thrown.
     *
     * @template {z.AnyZodObject} T The schema describing the expected environment shape.
     * @param {T} schema The Zod schema used to validate environment variables.
     * @returns {z.infer<T>} The validated environment object.
     */
    const createFromSchema = (schema) => {
        const envInput =
            'runtime' in options ? options.runtime : process.env ?? {}
        const parsed = schema.safeParse(envInput)
        if (!parsed.success) {
            return onValidationError(parsed.error)
        }
        return parsed.data
    }

    if (options.context === 'server' && typeof window !== 'undefined') {
        return onAccessError()
    }

    const schema = z.object(/** @type {T} */ (options.schema))
    return createFromSchema(schema)
}
