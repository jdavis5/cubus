import { z } from 'zod'

/**
 * Schema for environment variables representing booleans.
 * Coerces the string value to a boolean.
 */
const envBoolean = z.coerce.boolean()

/**
 * Schema for environment variables representing numbers.
 * Coerces the string value to a number.
 */
const envNumber = z.coerce.number()

/**
 * Schema for environment variables representing strings.
 * Validates that the value is a string.
 */
const envString = z.string()

/**
 * Collection of Zod schemas for environment variable types,
 * providing convenient coercion and validation utilities.
 */
const envUtils = {
    boolean: envBoolean,
    number: envNumber,
    string: envString
}

export default envUtils
