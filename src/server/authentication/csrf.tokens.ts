import crypto from 'node:crypto'
import { generateToken } from 'src/server/common/tokens'

const tokenAlgorithm = 'sha256'

const tokenLength = 24

const tokenEncoding = 'hex'

/**
 * Generates a CSRF value composed of a random token and its signature,
 * separated by a delimiter
 */
export const generateCsrfToken = () => {
    return generateToken(tokenLength, tokenEncoding)
}

/**
 * Signs the CSRF token using a private key
 */
export const signCsrfToken = (value: string) => {
    return crypto.createHash(tokenAlgorithm).update(value).digest(tokenEncoding)
}
