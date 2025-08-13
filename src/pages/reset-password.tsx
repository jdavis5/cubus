import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Assistance } from 'src/common/components/assistance'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { PasswordResetForm } from 'src/features/password-reset/password-reset-form'
import { MinimalLayout } from 'src/layouts/minimal-layout'
import { withSession } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withSession()

const ResetPasswordPage: PageComponent = () => {
    const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false)

    const handleSubmitted = () => {
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <ResetPasswordTemplate title="Email sent">
                <p>An email containing a reset link has been sent to you.</p>
            </ResetPasswordTemplate>
        )
    }

    return (
        <ResetPasswordTemplate title="Reset your password">
            <PasswordResetForm onSuccess={handleSubmitted} />
            <Assistance divider="Don't need to reset your password?">
                <p>
                    <Link href={{ pathname: '/sign-in' }}>Sign in</Link>
                </p>
            </Assistance>
        </ResetPasswordTemplate>
    )
}

ResetPasswordPage.layout = ({ children }) => (
    <MinimalLayout>{children}</MinimalLayout>
)

export default ResetPasswordPage

type ResetPasswordTemplateProps = React.PropsWithChildren<{
    title: string
}>

const ResetPasswordTemplate = ({
    children,
    title
}: ResetPasswordTemplateProps) => {
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
