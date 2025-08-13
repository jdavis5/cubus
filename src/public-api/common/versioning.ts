import env from 'env/server'

/**
 * Tests if the given API version string is valid
 */
export const isValidVersionString = (value: string) => {
    const versionNumber = versionStringToNumber(value)
    return Boolean(versionNumber && isVersionInRange(versionNumber))
}
/**
 * Tests if a numeric API version is within a valid range
 */
const isVersionInRange = (version: number) => {
    return version > 0 && version <= env.API_VERSION
}

/**
 * Parses a URL into an API version string if valid, otherwise returns null
 */
export const parseVersionFromUrl = (value: string) => {
    const pattern = new RegExp(/\/api\/(v[^\/\s]+)/)
    const matches = pattern.exec(value)
    if (!matches) {
        return null
    }
    const versionString = matches[1]
    if (!versionString || !isValidVersionString(versionString)) {
        return null
    }
    return versionString
}

/**
 * Transforms an API version string into a numeric version
 */
const versionStringToNumber = (value: string) => {
    const pattern = new RegExp(/^v(\d+)$/)
    const matches = pattern.exec(value)
    if (!matches) {
        return null
    }
    return Number(matches[1])
}
