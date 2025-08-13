import { type NextApiRequest } from 'next'
import prisma from 'prisma/main'
import { z } from 'zod'
import { ApiInvalidKeyProblem } from 'src/public-api/common/problem-details/api-invalid-key-problem'

const apiKeySchema = z.string().optional()

/**
 * Parses the request into a valid API key
 */
export const parseApiKey = async (req: NextApiRequest) => {
    const key = apiKeySchema.parse(req.headers['authorization'])
    if (!key) {
        throw new ApiInvalidKeyProblem()
    }
    const pattern = new RegExp(/(?:(?<protocol>Bearer) )(?<token>[a-f0-9]+)/)
    const matches = pattern.exec(key)
    if (!matches?.groups?.['token']) {
        throw new ApiInvalidKeyProblem()
    }
    const record = await prisma.token.findByToken(matches.groups['token'])
    if (!record || !record.isEnabled) {
        throw new ApiInvalidKeyProblem()
    }
    return record.id
}
