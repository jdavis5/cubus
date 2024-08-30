import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import {
    type GetServerSidePropsContext,
    type InferGetServerSidePropsType
} from 'next'
import prisma from 'prisma/main'
import { z } from 'zod'
import { Assistance } from 'src/common/components/assistance'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { LinkButton } from 'src/common/components/link-button'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { ConfirmUpdateEmailForm } from 'src/features/email-update/confirm-update-email-form'
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
    const tokenSummary = await prisma.token.findValidEmailUpdateSummary(token)
    return {
        props: {
            token,
            tokenSummary
        }
    }
}

type StepData =
    | { step: 'ready'; token: string; userId: string; newEmail: string }
    | { step: 'token_expired' }
    | { step: 'complete' }

type UpdateEmailPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>

const UpdateEmailPage: PageComponent<UpdateEmailPageProps> = ({
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
            newEmail: tokenSummary.user.unconfirmedEmail
        }
    })

    const handleSuccess = () => {
        setStepData({ step: 'complete' })
    }

    const handleExpiredToken = () => {
        setStepData({ step: 'token_expired' })
    }

    if (stepData.step === 'complete') {
        return (
            <UpdateEmailTemplate title="Update complete">
                <p>Your email has been successfully updated.</p>
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
            </UpdateEmailTemplate>
        )
    }
    if (stepData.step === 'ready') {
        return (
            <UpdateEmailTemplate title="Confirm new email address">
                <ConfirmUpdateEmailForm
                    userId={stepData.userId}
                    newEmail={stepData.newEmail}
                    token={stepData.token}
                    onSuccess={handleSuccess}
                    onExpired={handleExpiredToken}
                />
                <Assistance divider="Need help?">
                    <Link
                        href={{
                            pathname: '/reset-password'
                        }}
                    >
                        Forgotten your password?
                    </Link>
                </Assistance>
            </UpdateEmailTemplate>
        )
    }
    return (
        <UpdateEmailTemplate title="Unable to continue">
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
        </UpdateEmailTemplate>
    )
}

UpdateEmailPage.layout = ({ children }) => (
    <MinimalLayout>{children}</MinimalLayout>
)

export default UpdateEmailPage

type UpdateEmailTemplateProps = React.PropsWithChildren<{
    title: string
}>

const UpdateEmailTemplate = ({ title, children }: UpdateEmailTemplateProps) => {
    return (
        <>
            <Head>
                <title>{pageTitle('Update your email')}</title>
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
