import React from 'react'
import { useRouter } from 'next/router'

/**
 * URL utilities for the current route.
 *
 * - pathname: The current pathname
 * - searchParams: The current URLSearchParams object
 * - replaceUrl: A convenience wrapper around router.replace
 */
export const usePageUrl = () => {
    const router = useRouter()

    const asPath = router.isReady ? router.asPath : ''
    const pathParts = asPath.split('?', 2)
    const pathname = pathParts[0] ?? ''
    const query = pathParts[1] ?? ''

    const searchParams = React.useMemo(() => {
        return new URLSearchParams(query)
    }, [query])

    /**
     * Updates the current URL using Next.js router.replace.
     */
    const replaceUrl = React.useCallback(
        async (
            params: Record<string, string> | URLSearchParams = searchParams,
            options?: { shallow?: boolean; scroll?: boolean }
        ) => {
            const query =
                params instanceof URLSearchParams ? params.toString() : params

            return router.replace(
                {
                    pathname,
                    query
                },
                undefined,
                {
                    shallow: options?.shallow ?? false,
                    scroll: options?.scroll ?? false
                }
            )
        },
        [pathname, router, searchParams]
    )

    return {
        pathname,
        searchParams,
        replaceUrl
    } as const
}
