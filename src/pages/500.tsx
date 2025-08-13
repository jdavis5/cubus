import React from 'react'
import Head from 'next/head'
import { FaArrowRight } from 'react-icons/fa'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { IconItem } from 'src/common/components/icon-item'
import { LinkButton } from 'src/common/components/link-button'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { ErrorLayout } from 'src/layouts/error-layout'

const ServerErrorPage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('Something went wrong')}</title>
                <meta
                    name="description"
                    content="The URL does not exist on this server"
                />
                <meta name="keywords" content="not found" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Something went wrong</Heading>
                    <p>
                        An unexpected error has been encountered.
                        <br />
                        Please try again later.
                    </p>

                    <LinkButton href={{ pathname: '/' }}>
                        <IconItem icon={<FaArrowRight />} variant="right">
                            Visit the home page
                        </IconItem>
                    </LinkButton>
                </Section>
            </Container>
        </>
    )
}

ServerErrorPage.layout = ({ children }) => <ErrorLayout>{children}</ErrorLayout>

export default ServerErrorPage
