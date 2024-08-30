import { ApiProblemDetails } from './core/api-problem-details'

type ApiInternalProblemOptions = {
    detail?: string
}

export class ApiInternalProblem extends ApiProblemDetails {
    constructor(options: ApiInternalProblemOptions = {}) {
        super({
            problemId: 'internal',
            statusCode: 500,
            title: 'Something went wrong',
            detail:
                options?.detail ??
                'An internal error has occurred and your request could not be completed at this time. Please try again later.'
        })
    }
}
