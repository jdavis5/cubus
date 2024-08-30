import React from 'react'
import { type NextPage } from 'next'

/**
 * Adds additional properties to page components
 */
export type PageComponent<Props = {}, InitialProps = Props> = NextPage<
    Props,
    InitialProps
> & {
    layout?: React.ComponentType<React.PropsWithChildren>
}

/**
 * Transforms the the given input into a page title
 */
export const pageTitle = (value: string) => {
    return `${value} - Cubus`
}
