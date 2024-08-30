import styles from './style.module.scss'
import React from 'react'
import Head from 'next/head'
import { DocsContent } from 'src/layouts/docs-layout/docs-content'
import { DocsDesktopMenu } from 'src/layouts/docs-layout/docs-desktop-menu'
import { DocsFooter } from 'src/layouts/docs-layout/docs-footer'
import { DocsHeader } from 'src/layouts/docs-layout/docs-header'
import { DocsLayoutProvider } from 'src/layouts/docs-layout/docs-layout.context'

type DocsLayoutProps = React.PropsWithChildren

export const DocsLayout = ({ children }: DocsLayoutProps) => {
    return (
        <DocsLayoutProvider>
            <Head>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
                <meta name="robots" content="noindex,nofollow" />
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <div className={styles['layout']}>
                <DocsHeader />
                <div className={styles['layout-content']}>
                    <DocsDesktopMenu />
                    <DocsContent>{children}</DocsContent>
                </div>
                <DocsFooter />
            </div>
        </DocsLayoutProvider>
    )
}
