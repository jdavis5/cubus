import 'swagger-ui-react/swagger-ui.css'
import React from 'react'
import dynamic from 'next/dynamic'
import { type SwaggerUIProps } from 'swagger-ui-react'

// SwaggerUI must be loaded dynamically in the browser
const SwaggerUIDynamic = dynamic(() => import('swagger-ui-react'), {
    ssr: false
})

type SpecViewerProps = Pick<SwaggerUIProps, 'url'>

export const SpecViewer = ({ url }: SpecViewerProps) => {
    return <SwaggerUIDynamic url={url} />
}
