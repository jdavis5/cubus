import React from 'react'

/**
 * Invokes the provided callback if a user clicks outside of the provided element
 */
export const useOnOutsideClick = <T extends HTMLElement = HTMLElement>(
    callback: () => void
) => {
    const ref = React.useRef<T>(null)

    React.useEffect(() => {
        const element = ref.current
        if (!element) {
            return
        }
        const listener = (event: MouseEvent) => {
            const target = event.target
            if (target instanceof HTMLElement && !element.contains(target)) {
                callback()
            }
        }
        document.addEventListener('click', listener, true)
        return () => {
            document.removeEventListener('click', listener, true)
        }
    }, [ref, callback])

    return ref
}
