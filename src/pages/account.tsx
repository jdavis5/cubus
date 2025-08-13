import React from 'react'
import Head from 'next/head'
import { InferGetServerSidePropsType } from 'next'
import { type PageComponent, pageTitle } from 'src/common/page'
import { AccountHomeContent } from 'src/features/account-home/account-home-content'
import { AccountLayout } from 'src/layouts/account-layout'
import { withAuthenticatedSession } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withAuthenticatedSession()

type AccountPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const AccountPage: PageComponent<AccountPageProps> = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('Your Account')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <AccountHomeContent />
        </>
    )
}

AccountPage.layout = ({ children }) => <AccountLayout>{children}</AccountLayout>

export default AccountPage
