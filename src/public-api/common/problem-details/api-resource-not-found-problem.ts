import { ApiProblemDetails } from './core/api-problem-details'

type ApiResourceNotFoundProblemOptions = {
    detail?: string
}

export class ApiResourceNotFoundProblem extends ApiProblemDetails {
    constructor(options?: ApiResourceNotFoundProblemOptions) {
        super({
            problemId: 'resource-not-found',
            statusCode: 404,
            title: 'Resource not found',
            detail:
                options?.detail ?? 'The requested resource could not be found.'
        })
    }
}
