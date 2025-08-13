type ApiErrorOptions = ErrorOptions

export class ApiError extends Error {
    static {
        this.prototype.name = this.name
    }

    code?: string

    constructor(message?: string, options?: ApiErrorOptions) {
        super(message, options)
    }
}

export class ApiAccessUnauthorizedError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'You do not have permission to access this resource',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}

export class ApiAccountNotFoundError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'Could not find that account',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}

export class ApiEmailNotAvailableError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'An account is already registered to this email',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}

export class ApiInternalError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'Something went wrong',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}

export class ApiIncorrectPasswordError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'Incorrect password',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}

export class ApiKeyLimitError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'Your key limit has been exceeded',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}

export class ApiKeyNameError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'One of your keys already uses that name',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}

export class ApiTokenExpiredError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    override code = 'token_expired'

    constructor(message?: string, options?: ApiErrorOptions) {
        super(message, options)
    }
}

export class ApiUnauthenticatedError extends ApiError {
    static {
        this.prototype.name = this.name
    }

    constructor(
        message: string = 'Unauthenticated',
        options?: ApiErrorOptions
    ) {
        super(message, options)
    }
}
