import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import env from 'env/client'
import { Code } from 'src/common/components/code'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { DocsLayout } from 'src/layouts/docs-layout'

const DocsUsingTheApiPage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('Using the API')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Using the API</Heading>
                    <p>
                        In order to use the Cubus API you must first{' '}
                        <Link href={{ pathname: '/register' }}>
                            create an account
                        </Link>
                        .
                    </p>
                    <p>
                        Usage of the Cubus API is subject to our{' '}
                        <Link href={{ pathname: '/terms' }}>
                            Terms of Service
                        </Link>
                        .
                    </p>
                    <Section>
                        <Heading as="h2">Connecting to the API</Heading>
                        <p>
                            Connections are made to an available version of the
                            API using the following format:
                            <br />
                            <Code>
                                {env.NEXT_PUBLIC_BASE_URL}/api/&lt;version&gt;
                            </Code>
                        </p>
                        <p>
                            For example, to connect to API v1:
                            <br />
                            <Code>{env.NEXT_PUBLIC_BASE_URL}/api/v1</Code>
                        </p>
                    </Section>
                    <Section>
                        <Heading as="h2">Authentication</Heading>
                        <p>
                            A valid API key is required to access the Cubus API.
                            These can be generated from{' '}
                            <Link href={{ pathname: '/account' }}>
                                your account
                            </Link>
                            .<br />
                            Failing to provide a valid key when accessing the
                            API will result in an{' '}
                            <Link
                                href={{
                                    pathname: '/docs/api/error-reference',
                                    hash: 'invalid-key'
                                }}
                            >
                                error response
                            </Link>
                            .
                        </p>
                        <p>
                            The API key should be included as a request header
                            in the following format:
                            <br />
                            <Code>Authorization: Bearer &lt;key&gt;</Code>
                        </p>
                    </Section>
                </Section>
            </Container>
        </>
    )
}

DocsUsingTheApiPage.layout = ({ children }) => (
    <DocsLayout>{children}</DocsLayout>
)

export default DocsUsingTheApiPage
