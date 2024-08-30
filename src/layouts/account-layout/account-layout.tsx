import styles from './style.module.scss'
import Head from 'next/head'
import clsx from 'clsx'
import { useAuthenticatedSession } from 'src/common/authentication/session'
import { pageTitle } from 'src/common/page'
import { WelcomeOverview } from 'src/features/account-activation/welcome-overview'
import { AccountContent } from 'src/layouts/account-layout/account-content'
import { AccountDesktopMenu } from 'src/layouts/account-layout/account-desktop-menu'
import { AccountHeader } from 'src/layouts/account-layout/account-header'
import { AccountLayoutProvider } from 'src/layouts/account-layout/account-layout.context'

type AccountLayoutProps = React.PropsWithChildren

export const AccountLayout = ({ children }: AccountLayoutProps) => {
    const session = useAuthenticatedSession()

    if (!session.user.emailVerifiedAt) {
        return (
            <AccountLayoutTemplate>
                <Head>
                    <title>{pageTitle('Activate your account')}</title>
                </Head>
                <div className={clsx(styles['layout'], styles['layout--alt'])}>
                    <AccountHeader />
                    <AccountContent>
                        <WelcomeOverview />
                    </AccountContent>
                </div>
            </AccountLayoutTemplate>
        )
    }

    return (
        <AccountLayoutTemplate>
            <div className={styles['layout']}>
                <AccountHeader />
                <AccountDesktopMenu />
                <AccountContent>{children}</AccountContent>
            </div>
        </AccountLayoutTemplate>
    )
}

type AccountLayoutTemplateProps = React.PropsWithChildren

const AccountLayoutTemplate = ({ children }: AccountLayoutTemplateProps) => {
    return (
        <AccountLayoutProvider>
            <Head>
                <meta name="robots" content="noindex,nofollow" />
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            {children}
        </AccountLayoutProvider>
    )
}
