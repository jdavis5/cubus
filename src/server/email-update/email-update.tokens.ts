import { nanoid } from 'nanoid'

const tokenLength = 28

/**
 * Generates a new `EMAIL_UPDATE` token
 */
export const generateEmailUpdateToken = () => {
    return nanoid(tokenLength)
}
