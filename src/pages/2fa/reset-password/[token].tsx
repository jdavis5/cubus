import React from 'react'
import Head from 'next/head'
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
import { ConfirmPasswordResetForm } from 'src/features/password-reset/confirm-password-reset-form'
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
    const tokenSummary = await prisma.token.findValidPasswordResetSummary(token)
    return {
        props: {
            token,
            tokenSummary
        }
    }
}

type StepData =
    | { step: 'ready'; token: string; userId: string; email: string }
    | { step: 'token_expired' }
    | { step: 'complete' }

type PasswordResetPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>

const PasswordResetPage: PageComponent<PasswordResetPageProps> = ({
    token,
    tokenSummary
}) => {
    const [stepData, setStepData] = React.useState<StepData>(() => {
        if (!tokenSummary) {
            return {
                step: 'token_expired'
            }
        }
        return {
            step: 'ready',
            token,
            userId: tokenSummary.userId,
            email: tokenSummary.user.email
        }
    })

    const handleSuccess = () => {
        setStepData({ step: 'complete' })
    }

    const handleExpiredToken = () => {
        setStepData({ step: 'token_expired' })
    }

    if (stepData.step === 'ready') {
        return (
            <PasswordResetTemplate title="Choose your new password">
                <ConfirmPasswordResetForm
                    userId={stepData.userId}
                    token={stepData.token}
                    dict={[stepData.email]}
                    onSuccess={handleSuccess}
                    onExpired={handleExpiredToken}
                />
            </PasswordResetTemplate>
        )
    }
    if (stepData.step === 'complete') {
        return (
            <PasswordResetTemplate title="Password updated">
                <Head>
                    <title>{pageTitle('Password updated')}</title>
                </Head>
                <p>You can now sign in with your new password.</p>
                <p>
                    <LinkButton
                        variant="cta"
                        href={{
                            pathname: '/sign-in'
                        }}
                    >
                        Sign in
                    </LinkButton>
                </p>
            </PasswordResetTemplate>
        )
    }
    return (
        <PasswordResetTemplate title="Unable to continue">
            <p>This page has expired.</p>
            <p>
                <LinkButton
                    variant="cta"
                    href={{
                        pathname: '/reset-password'
                    }}
                >
                    Reset your password
                </LinkButton>
            </p>
        </PasswordResetTemplate>
    )
}

PasswordResetPage.layout = ({ children }) => (
    <MinimalLayout>{children}</MinimalLayout>
)

export default PasswordResetPage

type PasswordResetTemplateProps = React.PropsWithChildren<{
    title: string
}>

const PasswordResetTemplate = ({
    children,
    title
}: PasswordResetTemplateProps) => {
    return (
        <>
            <Head>
                <title>{pageTitle('Reset your password')}</title>
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
