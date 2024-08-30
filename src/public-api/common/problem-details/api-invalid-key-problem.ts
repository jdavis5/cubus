import { ApiProblemDetails } from './core/api-problem-details'

type ApiInvalidKeyProblemOptions = {
    detail?: string
}

export class ApiInvalidKeyProblem extends ApiProblemDetails {
    constructor(options?: ApiInvalidKeyProblemOptions) {
        super({
            problemId: 'invalid-key',
            statusCode: 401,
            title: 'The API key is not valid',
            detail:
                options?.detail ??
                `In order to access this resource you must provide a valid API key. ` +
                    'Please activate the required key or generate a new key from your account.'
        })
    }
}
