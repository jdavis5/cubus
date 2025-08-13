import styles from './style.module.scss'
import React from 'react'
import Head from 'next/head'
import { MinimalFooter } from './minimal-footer'
import { MinimalHeader } from './minimal-header'

type MinimalLayoutProps = React.PropsWithChildren

export const MinimalLayout = ({ children }: MinimalLayoutProps) => {
    return (
        <>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
            </Head>
            <div className={styles['layout']}>
                <div className={styles['layout-header']}>
                    <MinimalHeader />
                </div>
                <main className={styles['main-content']}>{children}</main>
                <div className={styles['layout-footer']}>
                    <MinimalFooter />
                </div>
            </div>
        </>
    )
}
