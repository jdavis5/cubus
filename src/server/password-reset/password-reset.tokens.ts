import { nanoid } from 'nanoid'

const tokenLength = 28

/**
 * Generates a new `PASSWORD_RESET` token
 */
export const generatePasswordResetToken = () => {
    return nanoid(tokenLength)
}
