import { type NextApiRequest, type NextApiResponse } from 'next'
import prisma from 'prisma/main'
import {
    serializeCsrf,
    serializeCsrfTransport
} from 'src/server/authentication/csrf.cookies'
import {
    generateCsrfToken,
    signCsrfToken
} from 'src/server/authentication/csrf.tokens'
import { serializeSession } from 'src/server/authentication/session.cookies'

/**
 * Saves a new session
 */
export const saveSession = async (
    _: NextApiRequest,
    res: NextApiResponse,
    userId: string
) => {
    const token = await prisma.token.createSession(userId)
    const csrf = generateCsrfToken()
    res.setHeader('Set-Cookie', [
        serializeSession(token),
        serializeCsrf(csrf),
        serializeCsrfTransport(signCsrfToken(csrf))
    ])
}
