import {
    type NextApiHandler,
    type NextApiRequest,
    type NextApiResponse
} from 'next'
import {
    PrismaCustomError,
    isPrismaClientKnownRequestError
} from 'prisma/errors'
import prismaMain from 'prisma/main'
import { ZodError } from 'zod'
import { ApiInternalProblem } from './common/problem-details/api-internal-problem'
import { ApiInvalidInputProblem } from './common/problem-details/api-invalid-input-problem'
import { ApiMethodNotAllowedProblem } from './common/problem-details/api-method-not-allowed-problem'
import { ApiResourceNotFoundProblem } from './common/problem-details/api-resource-not-found-problem'
import { ApiProblemDetails } from './common/problem-details/core/api-problem-details'
import { parseApiKey } from 'src/public-api/api-keys/api/parse-api-key.helper'

const httpMethods = ['get', 'post'] as const

type HandlerHttpMethod = (typeof httpMethods)[number]

type HandlerOptions = Record<HandlerHttpMethod, NextApiHandler>

const isHandlerHttpMethod = (method: unknown): method is HandlerHttpMethod => {
    const methods: ReadonlyArray<unknown> = httpMethods
    return methods.includes(method)
}

/**
 * The Next `API` route handler for the public API
 * Error responses fit the Problem Details specification for HTTP APIs
 *
 * {@link https://www.rfc-editor.org/rfc/rfc9457}
 */
export const publicApiHandler = <T extends Partial<HandlerOptions>>(
    options: {} extends T ? never : T
) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const method = req.method?.toLowerCase()
            if (!isHandlerHttpMethod(method)) {
                throw new ApiMethodNotAllowedProblem({
                    allowed: Object.keys(options)
                })
            }
            const key = await parseApiKey(req)
            await prismaMain.token.logAccess(key)
            return await options[method]?.(req, res)
        } catch (error: unknown) {
            res.setHeader('Content-Type', 'application/problem+json')
            if (error instanceof ApiProblemDetails) {
                if (error instanceof ApiMethodNotAllowedProblem) {
                    res.setHeader('Allow', error.allowed)
                }
                return res.status(error.status).json(error)
            }
            if (error instanceof PrismaCustomError) {
                const problem = new ApiInternalProblem()
                return res.status(problem.status).json(problem)
            }
            if (error instanceof ZodError) {
                const problem = new ApiInvalidInputProblem(error)
                return res.status(problem.status).json(problem)
            }
            if (error instanceof Error) {
                if (isPrismaClientKnownRequestError(error)) {
                    if (error.code === 'P2025') {
                        const problem = new ApiResourceNotFoundProblem({
                            detail: error.message
                        })
                        return res.status(problem.status).json(problem)
                    }
                }
            }
            const problem = new ApiInternalProblem()
            return res.status(problem.status).json(problem)
        }
    }
}
