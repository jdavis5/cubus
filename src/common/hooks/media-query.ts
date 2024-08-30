import React from 'react'

/**
 * Listens for changes to the provided media query
 */
export const useMediaQuery = (query: string) => {
    const [mediaQueryList, setMediaQueryList] = React.useState<MediaQueryList>()

    React.useEffect(() => {
        const supportsMediaQuery =
            'MediaQueryList' in window &&
            'addEventListener' in MediaQueryList.prototype
        if (!supportsMediaQuery) {
            return
        }
        const list = window.matchMedia(query)
        const listener = () => {
            setMediaQueryList(list)
        }
        list.addEventListener('change', listener)
        return () => {
            list.removeEventListener('change', listener)
        }
    }, [query, mediaQueryList])

    if (!mediaQueryList) {
        return
    }

    return mediaQueryList.matches
}
