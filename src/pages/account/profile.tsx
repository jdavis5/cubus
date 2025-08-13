import React from 'react'
import Head from 'next/head'
import { type InferGetServerSidePropsType } from 'next'
import prisma from 'prisma/main'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { CloseAccountModalButton } from 'src/features/account-closure/close-account-modal-button'
import { ProfileOverview } from 'src/features/profile/profile-overview'
import { AccountLayout } from 'src/layouts/account-layout'
import { withAuthenticatedSessionCallback } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withAuthenticatedSessionCallback(
    async (context) => {
        return {
            props: {
                profile: await prisma.user.findProfileOrThrow(
                    context.req.session.user.id
                )
            }
        }
    }
)

type AccountProfilePageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>

const AccountProfilePage: PageComponent<AccountProfilePageProps> = ({
    profile
}) => {
    return (
        <>
            <Head>
                <title>{pageTitle('Your Profile')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Your Profile</Heading>
                    <ProfileOverview
                        firstName={profile.firstName}
                        surname={profile.surname}
                        email={profile.email}
                    />
                    <Section>
                        <Heading as="h2">Close your account</Heading>
                        <p>
                            <CloseAccountModalButton />
                        </p>
                    </Section>
                </Section>
            </Container>
        </>
    )
}

AccountProfilePage.layout = ({ children }) => (
    <AccountLayout>{children}</AccountLayout>
)

export default AccountProfilePage
