import { intlFormat, intlFormatDistance, isValid } from 'date-fns'

/**
 * Creates a user-friendly stamp for the API key generatedAt
 */
export const formatGeneratedAtDate = (value: Date) => {
    return isValid(value)
        ? intlFormat(value, {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric'
          })
        : 'never'
}

/**
 * Creates a user-friendly stamp for the API key lastUsedAt
 */
export const formatLastUsedAtDate = (value: Date | null) => {
    if (!value) {
        return 'never'
    }
    return isValid(value)
        ? intlFormatDistance(value, new Date(), {
              numeric: 'always'
          })
        : 'never'
}
