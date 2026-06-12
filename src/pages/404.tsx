import React from 'react'
import Head from 'next/head'
import { Container } from 'src/common/components/container'
import { ErrorPath } from 'src/common/components/error-path'
import { Heading } from 'src/common/components/heading'
import { LinkButton } from 'src/common/components/link-button'
import { Section } from 'src/common/components/section'
import { usePageUrl } from 'src/common/hooks/page-url'
import { type PageComponent, pageTitle } from 'src/common/page'
import { ErrorLayout } from 'src/layouts/error-layout'

const NotFoundErrorPage: PageComponent = () => {
    const { pathname } = usePageUrl()

    return (
        <>
            <Head>
                <title>{pageTitle('Page not found')}</title>
                <meta name="description" content="Page not found" />
                <meta name="keywords" content="not found" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Page not found</Heading>
                    <p>Sorry, we couldn't find that page.</p>
                    <ErrorPath pathname={pathname} />
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
