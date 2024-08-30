import crypto from 'node:crypto'

/**
 * Generates a randomised token of a specified length
 *
 * A default length of 32 is used if not specified
 * A default encoding of hex is used if not specified
 */
export const generateToken = (
    length: number = 32,
    encoding: BufferEncoding = 'hex'
) => crypto.randomBytes(length).toString(encoding)
