import React from 'react'
import { useRouter } from 'next/router'

/**
 * A hook to manipulate the current URL
 */
export const usePageUrl = () => {
    const router = useRouter()

    const [pathname, query] = router.asPath.split('?', 2)

    const searchParams = React.useMemo(() => {
        return new URLSearchParams(query)
    }, [query])

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
