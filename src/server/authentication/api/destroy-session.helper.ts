import { type NextApiRequest, type NextApiResponse } from 'next'
import prisma from 'prisma/main'
import {
    getSessionFromCookies,
    serializeDeletedSession
} from 'src/server/authentication/session.cookies'

/**
 * Destroys the session
 */
export const destroySession = async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    const token = getSessionFromCookies(req.cookies)
    if (token) {
        await prisma.token.deleteSession(token)
    }
    res.setHeader('Set-Cookie', serializeDeletedSession())
}
