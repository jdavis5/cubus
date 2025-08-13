/**
 * Formats a price into a number
 */
export const formatPrice = (
    value: string | number,
    locale: Intl.UnicodeBCP47LocaleIdentifier = 'en-US',
    options: Intl.NumberFormatOptions = {}
) => {
    return new Intl.NumberFormat(locale, {
        ...options,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(typeof value === 'string' ? parseFloat(value) : value)
}
