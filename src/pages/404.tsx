import React from 'react'
import Head from 'next/head'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { LinkButton } from 'src/common/components/link-button'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { NotFoundPath } from 'src/features/error/not-found-path'
import { ErrorLayout } from 'src/layouts/error-layout'

const NotFoundErrorPage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('Page not found')}</title>
                <meta
                    name="description"
                    content="The URL does not exist on this server"
                />
                <meta name="keywords" content="not found" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Page not found</Heading>
                    <NotFoundPath />
                    <p>
                        Sorry, we couldn&apos;t find the page you were looking
                        for.
                    </p>
                    <LinkButton variant="cta" href={{ pathname: '/' }}>
                        Visit the home page
                    </LinkButton>
                </Section>
            </Container>
        </>
    )
}

NotFoundErrorPage.layout = ({ children }) => (
    <ErrorLayout>{children}</ErrorLayout>
)

export default NotFoundErrorPage
