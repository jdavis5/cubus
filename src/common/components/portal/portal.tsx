import React from 'react'
import { createPortal } from 'react-dom'
import { ClientOnly } from 'src/common/components/client-only'

type PortalProps = React.PropsWithChildren<{
    elementId: string
}>

export const Portal = (props: PortalProps) => {
    return (
        <ClientOnly>
            <PortalContent {...props} />
        </ClientOnly>
    )
}

const PortalContent = ({ elementId, children }: PortalProps) => {
    const root = document.getElementById(elementId)
    return root ? createPortal(children, root) : null
}
