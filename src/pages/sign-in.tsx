import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { type AuthOptions } from 'src/common/authentication/auth-options'
import { Assistance } from 'src/common/components/assistance'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { Subheading } from 'src/common/components/subheading'
import { type PageComponent, pageTitle } from 'src/common/page'
import { IdentifyUserForm } from 'src/features/authentication/identify-user-form'
import { SignInForm } from 'src/features/authentication/sign-in-form'
import { MinimalLayout } from 'src/layouts/minimal-layout'
import { withSessionCallback } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withSessionCallback(async (context) => {
    if (context.req.session.user) {
        return {
            redirect: {
                destination: '/account',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
})

type StepData = { step: 'identify' } | { step: 'sign_in'; email: string }

const SignInPage: PageComponent = () => {
    const [stepData, setStepData] = React.useState<StepData>({
        step: 'identify'
    })

    const handleReset = () => {
        setStepData({ step: 'identify' })
    }

    const handleSuccess = (data: {
        authMethod: AuthOptions
        email: string
    }) => {
        if (data.authMethod === 'password') {
            setStepData({ step: 'sign_in', email: data.email })
        }
    }

    if (stepData.step === 'sign_in') {
        return (
            <SignInTemplate>
                <SignInForm email={stepData.email} onReset={handleReset} />
                <Assistance divider="Need help?">
                    <Link href={{ pathname: '/reset-password' }}>
                        Forgotten your password?
                    </Link>
                </Assistance>
            </SignInTemplate>
        )
    }

    return (
        <SignInTemplate>
            <IdentifyUserForm onSuccess={handleSuccess} />
            <Assistance divider="New to Cubus?" align="middle">
                <Link href={{ pathname: '/register' }}>
                    Register an account
                </Link>
            </Assistance>
        </SignInTemplate>
    )
}

SignInPage.layout = ({ children }) => <MinimalLayout>{children}</MinimalLayout>

export default SignInPage

type SignInTemplateProps = React.PropsWithChildren

const SignInTemplate = ({ children }: SignInTemplateProps) => {
    return (
        <>
            <Head>
                <title>{pageTitle('Sign in')}</title>
                <meta name="description" content="A description of this page" />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container align="middle" constrict>
                <Section>
                    <Heading as="h1">Hello</Heading>
                    <Subheading>Sign in to your account</Subheading>
                    {children}
                </Section>
            </Container>
        </>
    )
}
