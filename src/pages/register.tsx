import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Assistance } from 'src/common/components/assistance'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { RegisterAccountForm } from 'src/features/registration/register-account-form'
import { MinimalLayout } from 'src/layouts/minimal-layout'
import { withSession } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withSession()

const RegisterPage: PageComponent = () => {
    const router = useRouter()

    const handleSuccess = () => {
        router.push({
            pathname: '/account'
        })
    }

    return (
        <>
            <Head>
                <title>{pageTitle('Register')}</title>
                <meta name="description" content="A description of this page" />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container align="middle" constrict>
                <Section>
                    <Heading as="h1">Create an account</Heading>
                    <RegisterAccountForm onSuccess={handleSuccess} />
                    <Assistance
                        align="middle"
                        divider="Already have an account?"
                    >
                        <Link href={{ pathname: '/sign-in' }}>Sign in</Link>
                    </Assistance>
                </Section>
            </Container>
        </>
    )
}

RegisterPage.layout = ({ children }) => (
    <MinimalLayout>{children}</MinimalLayout>
)

export default RegisterPage
