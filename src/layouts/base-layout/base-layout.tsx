import styles from './style.module.scss'
import Head from 'next/head'
import { BaseContent } from 'src/layouts/base-layout/base-content'
import { BaseFooter } from 'src/layouts/base-layout/base-footer'
import { BaseHeader } from 'src/layouts/base-layout/base-header'
import { BaseProvider } from 'src/layouts/base-layout/base-layout.context'

type BaseLayoutProps = React.PropsWithChildren

export const BaseLayout = ({ children }: BaseLayoutProps) => {
    return (
        <BaseProvider>
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
                <BaseHeader />
                <BaseContent>{children}</BaseContent>
                <BaseFooter />
            </div>
        </BaseProvider>
    )
}
