import React from 'react'
import { createPortal } from 'react-dom'

type PortalProps = React.PropsWithChildren<{
    elementId: string
}>

export const Portal = ({ elementId, children }: PortalProps) => {
    const [container, setContainer] = React.useState<HTMLElement | null>(null)

    React.useEffect(() => {
        const root = document.getElementById(elementId)
        if (root) {
            setContainer(root)
        }
    }, [elementId])

    if (!container) {
        return null
    }

    return createPortal(children, container)
}
