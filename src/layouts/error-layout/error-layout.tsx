import styles from './style.module.scss'
import React from 'react'
import Head from 'next/head'
import { Logo } from 'src/common/components/logo'

type ErrorLayoutProps = React.PropsWithChildren

export const ErrorLayout = ({ children }: ErrorLayoutProps) => {
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
                <div className={styles['layout-content']}>
                    <div className={styles['logo']}>
                        <Logo variant="large" />
                    </div>
                    <main className={styles['main-content']}>{children}</main>
                </div>
            </div>
        </>
    )
}
