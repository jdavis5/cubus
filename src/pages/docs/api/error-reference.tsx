import React from 'react'
import Head from 'next/head'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { ErrorList } from 'src/features/docs/error-list'
import { DocsLayout } from 'src/layouts/docs-layout'

const DocsApiErrorReferencePage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('API Error Reference')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">API Error Reference</Heading>
                    <p>
                        The following errors may be encountered when using the
                        Cubus API.
                    </p>
                    <ErrorList />
                </Section>
            </Container>
        </>
    )
}

DocsApiErrorReferencePage.layout = ({ children }) => (
    <DocsLayout>{children}</DocsLayout>
)

export default DocsApiErrorReferencePage
