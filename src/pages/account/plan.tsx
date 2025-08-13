import React from 'react'
import Head from 'next/head'
import { type InferGetServerSidePropsType } from 'next'
import prisma from 'prisma/main'
import { type PageComponent, pageTitle } from 'src/common/page'
import { PlanWizard } from 'src/features/plan/plan-wizard'
import { AccountLayout } from 'src/layouts/account-layout'
import { withAuthenticatedSessionCallback } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withAuthenticatedSessionCallback(
    async (context) => {
        return {
            props: {
                summary: await prisma.user.createSubscriptionSummary(
                    context.req.session.user.id
                ),
                available: await prisma.plan.listAvailable(),
                defaultPlan: await prisma.plan.findDefaultsOrThrow()
            }
        }
    }
)

type AccountPlanPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>

const AccountPlanPage: PageComponent<AccountPlanPageProps> = ({
    summary,
    available,
    defaultPlan
}) => {
    return (
        <>
            <Head>
                <title>{pageTitle('Update your plan')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <PlanWizard
                current={summary?.plan ?? defaultPlan}
                available={available}
                keys={summary?.apiKeys ?? []}
            />
        </>
    )
}

AccountPlanPage.layout = ({ children }) => (
    <AccountLayout>{children}</AccountLayout>
)

export default AccountPlanPage
