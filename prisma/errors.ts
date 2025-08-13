import { type Prisma } from 'prisma/main/client'

/**
 * Type predicate function that narrows to PrismaClientKnownRequestError
 *
 * As client instances are unreliable in combination with hot reloading,
 * this function can be used instead
 */
export const isPrismaClientKnownRequestError = (
    error: Error
): error is Prisma.PrismaClientKnownRequestError => {
    // NotFoundError is thrown by OrThrow methods and is a subclass of PrismaClientKnownRequestError
    return ['PrismaClientKnownRequestError', 'NotFoundError'].includes(
        error.constructor.name
    )
}

/**
 * Custom Prisma errors that are otherwise not covered
 * These are especially useful for client extensions
 */
export class PrismaCustomError extends Error {
    static {
        this.prototype.name = this.name
    }

    constructor(message?: string, options?: ErrorOptions) {
        super(message, options)
    }
}

/**
 * A raw aggegation pipeline result error
 */
export class PrismaCustomPipelineResultError extends PrismaCustomError {}
