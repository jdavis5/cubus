import { nanoid } from 'nanoid'

const tokenLength = 28

/**
 * Generates a new `ACCOUNT_ACTIVATION` token
 */
export const generateAccountActivationToken = () => {
    return nanoid(tokenLength)
}
