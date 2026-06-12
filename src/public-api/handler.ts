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

const supportedHttpMethods = ['get', 'post'] as const

type HandlerHttpMethod = (typeof supportedHttpMethods)[number]

/**
 * A type predicate function that narrows an unknown value to a supported HTTP method.
 */
const isSupportedHttpMethod = (
    method: unknown
): method is HandlerHttpMethod => {
    const methods: ReadonlyArray<unknown> = supportedHttpMethods
    return methods.includes(method)
}

/**
 * A Next.js `API` route handler for the public API.
 *
 * This handler dispatches requests based on the incoming HTTP method
 * to the provided handlers.
 *
 * API key access is logged for valid requests.
 *
 * Error responses follow the Problem Details specification for HTTP APIs.
 *
 * {@link https://www.rfc-editor.org/rfc/rfc9457}
 */
export const publicApiHandler = <
    T extends Partial<Record<HandlerHttpMethod, NextApiHandler>>
>(
    options: {} extends T ? never : T
) => {
    if (Object.keys(options).length === 0) {
        throw new Error('At least one HTTP method must be defined')
    }

    return async (req: NextApiRequest, res: NextApiResponse) => {
        try {
            const method = req.method?.toLowerCase()
            if (!isSupportedHttpMethod(method)) {
                throw new ApiMethodNotAllowedProblem({
                    allowed: Object.keys(options)
                })
            }

            const methodHandler = options[method]
            if (!methodHandler) {
                throw new ApiMethodNotAllowedProblem({
                    allowed: Object.keys(options)
                })
            }

            const key = await parseApiKey(req)
            await prismaMain.token.logAccess(key)

            return await methodHandler(req, res)
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

/**
 * A Next.js `API` route handler for the public API that
 * always returns a 404 Not Found response.
 *
 * The response follows the Problem Details specification for APIs.
 *
 * {@link https://www.rfc-editor.org/rfc/rfc9457}
 */
export const notFoundHandler = async (
    _: NextApiRequest,
    res: NextApiResponse
) => {
    res.setHeader('Content-Type', 'application/problem+json')

    const problem = new ApiResourceNotFoundProblem()
    return res.status(problem.status).json(problem)
}
