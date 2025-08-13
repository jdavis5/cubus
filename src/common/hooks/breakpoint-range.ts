import breakpoints from 'src/common/styles/variables/exports/breakpoints.module.scss'
import { useMediaQuery } from 'src/common/hooks/media-query'

/**
 * Returns the status of the browser being within a named breakpoint range
 */
export const useBreakpointRange = (
    range: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
) => {
    const breakpoint = breakpoints[range]
    if (!breakpoint) {
        throw new Error(`Breakpoint '${range}' was not found`)
    }
    return useMediaQuery(`(max-width: ${breakpoint})`)
}
