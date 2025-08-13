import { type NextApiRequest } from 'next'
import { z } from 'zod'
import { csrfCookie } from 'src/server/authentication/csrf.cookies'
import { signCsrfToken } from 'src/server/authentication/csrf.tokens'
import { ApiAccessUnauthorizedError } from 'src/server/common/api-errors'

const csrfSchema = z
    .string()
    .regex(/^[a-f0-9]+$/)
    .optional()
    .catch(undefined)

/**
 * Verifies a CSRF token header
 */
export const verifyCsrf = async (req: NextApiRequest) => {
    const token = csrfSchema.parse(req.headers['x-csrf-token'])
    const csrf = csrfCookie(req.cookies)
    if (!token || !csrf || signCsrfToken(csrf) !== token) {
        throw new ApiAccessUnauthorizedError()
    }
}
