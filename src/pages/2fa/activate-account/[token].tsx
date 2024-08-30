import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import {
    type GetServerSidePropsContext,
    type InferGetServerSidePropsType
} from 'next'
import prisma from 'prisma/main'
import { z } from 'zod'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { LinkButton } from 'src/common/components/link-button'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { AccountActivationConfirmationButton } from 'src/features/account-activation/account-activation-confirmation-button'
import { MinimalLayout } from 'src/layouts/minimal-layout'

const querySchema = z.object({
    token: z.string().optional()
})

export const getServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    const { token } = querySchema.parse(context.query)
    if (!token) {
        return {
            props: {}
        }
    }
    const tokenData = await prisma.token.findValidAccountActivationSummary(
        token
    )
    return {
        props: {
            token,
            tokenData
        }
    }
}

type StepData =
    | { step: 'ready'; token: string; userId: string }
    | { step: 'token_expired' }

type AccountActivationPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>

const AccountActivationPage: PageComponent<AccountActivationPageProps> = ({
    token,
    tokenData
}) => {
    const router = useRouter()
    const [stepData, setStepData] = React.useState<StepData>(() => {
        if (!tokenData) {
            return {
                step: 'token_expired'
            }
        }
        return {
            step: 'ready',
            token,
            userId: tokenData.userId
        }
    })

    const handleSuccess = () => {
        router.push({
            pathname: '/account'
        })
    }

    const handleExpiredToken = () => {
        setStepData({ step: 'token_expired' })
    }

    if (stepData.step === 'ready') {
        return (
            <ActivateTemplate title="Activate your account">
                <p>Click the button below to complete the activation.</p>
                <p>
                    <AccountActivationConfirmationButton
                        userId={stepData.userId}
                        token={stepData.token}
                        onSuccess={handleSuccess}
                        onExpired={handleExpiredToken}
                    />
                </p>
            </ActivateTemplate>
        )
    }
    return (
        <>
            <ActivateTemplate title="Unable to continue">
                <p>This page has expired.</p>
                <p>
                    <LinkButton
                        variant="cta"
                        href={{
                            pathname: '/account'
                        }}
                    >
                        View account
                    </LinkButton>
                </p>
            </ActivateTemplate>
        </>
    )
}

AccountActivationPage.layout = ({ children }) => (
    <MinimalLayout>{children}</MinimalLayout>
)

export default AccountActivationPage

type ActivateTemplateProps = React.PropsWithChildren<{
    title: string
}>

const ActivateTemplate = ({ title, children }: ActivateTemplateProps) => {
    return (
        <>
            <Head>
                <title>{pageTitle('Activate your account')}</title>
                <meta name="description" content="A description of this page" />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container align="middle" constrict>
                <Section>
                    <Heading as="h1">{title}</Heading>
                    {children}
                </Section>
            </Container>
        </>
    )
}
