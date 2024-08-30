import crypto from 'node:crypto'
import { generateToken } from 'src/server/common/tokens'

export const tokenLength = 32

const tokenAlgorithm = 'sha256'

const tokenEncoding = 'hex'

/**
 * Generates a new API key token
 */
export const generateApiKey = () => {
    return generateToken(tokenLength, tokenEncoding)
}

/**
 * Signs the API key token
 */
export const signApiKey = (value: string) => {
    return crypto.createHash(tokenAlgorithm).update(value).digest(tokenEncoding)
}
