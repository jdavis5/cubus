import React from 'react'
import Head from 'next/head'
import { type InferGetServerSidePropsType } from 'next'
import prisma from 'prisma/main'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { ApiKeysOverview } from 'src/features/api-keys/api-keys-overview'
import { AccountLayout } from 'src/layouts/account-layout'
import { withAuthenticatedSessionCallback } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withAuthenticatedSessionCallback(
    async (context) => {
        return {
            props: {
                summary: await prisma.user.createSubscriptionSummary(
                    context.req.session.user.id
                ),
                defaultPlan: await prisma.plan.findDefaultsOrThrow()
            }
        }
    }
)

type AccountAccessPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>

const AccountAccessPage: PageComponent<AccountAccessPageProps> = ({
    summary,
    defaultPlan
}) => {
    return (
        <>
            <Head>
                <title>{pageTitle('Accessing the Cubus API')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Accessing the API</Heading>
                    <ApiKeysOverview
                        plan={summary?.plan ?? defaultPlan}
                        keys={summary?.apiKeys ?? []}
                    />
                </Section>
            </Container>
        </>
    )
}

AccountAccessPage.layout = ({ children }) => (
    <AccountLayout>{children}</AccountLayout>
)

export default AccountAccessPage
