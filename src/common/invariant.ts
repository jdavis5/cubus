/**
 * Throws an error if the condition is falsy
 */
export function invariant(
    condition: unknown,
    message: string
): asserts condition {
    if (!condition) {
        throw new Error(message)
    }
}
