import { ApiProblemDetails } from './core/api-problem-details'

type ApiMethodNotAllowedProblemOptions = {
    allowed: Array<string>
}

export class ApiMethodNotAllowedProblem extends ApiProblemDetails {
    allowed: Array<string>

    constructor(options: ApiMethodNotAllowedProblemOptions) {
        super({
            problemId: 'method-not-allowed',
            statusCode: 405,
            title: 'Method not allowed',
            detail: 'The requested method is not allowed for this operation.'
        })
        this.allowed = options.allowed
    }
}
