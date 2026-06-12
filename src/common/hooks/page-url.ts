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

    const [pathname, setPathname] = React.useState<string>('')
    const [queryString, setQueryString] = React.useState<string>('')

    React.useEffect(() => {
        if (!router.isReady) {
            return
        }

        const [urlPath = '', urlQuery = ''] = router.asPath.split('?', 2)

        setPathname(urlPath)
        setQueryString(urlQuery)
    }, [router.isReady, router.asPath])

    const searchParams = React.useMemo(() => {
        return new URLSearchParams(queryString)
    }, [queryString])

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
