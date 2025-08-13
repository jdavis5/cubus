import { ZodError } from 'zod'
import { ApiProblemDetails } from './core/api-problem-details'

export class ApiInvalidInputProblem extends ApiProblemDetails {
    public error: ZodError

    constructor(error: ZodError) {
        super({
            problemId: 'invalid-input',
            statusCode: 400,
            title: 'Invalid input'
        })

        this.error = error
    }

    override toJSON() {
        const flattened = this.error.flatten()

        return {
            ...super.toJSON(),
            errors: flattened.formErrors.length
                ? flattened.formErrors
                : flattened.fieldErrors
        }
    }
}
