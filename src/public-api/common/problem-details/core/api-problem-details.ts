import env from 'env/server'
import { type ProblemDetails } from './problem-details'

type ApiProblemDetailsOptions = {
    problemId: string
    statusCode: number
    title: string
    detail?: string
}

/**
 * An implementation of the Problem Details specification for HTTP APIs  \
 * {@link https://www.rfc-editor.org/rfc/rfc9457}  \
 * This base class covers the core members of a Problem Details object to be inherited by a concrete class.
 */
export abstract class ApiProblemDetails implements ProblemDetails {
    type: URL = new URL('docs/api/error-reference', env.NEXT_PUBLIC_BASE_URL)
    status: number
    title?: string
    detail?: string

    constructor(options: ApiProblemDetailsOptions) {
        this.type.hash = options.problemId
        this.status = options.statusCode
        this.title = options.title
        this.detail = options.detail
    }

    /**
     * Serializes the instance
     */
    toJSON() {
        return {
            type: this.type.toString(),
            status: this.status,
            title: this.title,
            detail: this.detail
        }
    }
}
