/**
 * Problem Details specification for HTTP APIs
 *
 * {@link https://www.rfc-editor.org/rfc/rfc9457}
 */
export type ProblemDetails = {
    type?: URL
    status?: number
    title?: string
    detail?: string
}
