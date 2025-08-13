import 'swagger-ui-react/swagger-ui.css'
import React from 'react'
import Head from 'next/head'
import {
    type GetServerSidePropsContext,
    type InferGetServerSidePropsType
} from 'next'
import { z } from 'zod'
import { ClientOnly } from 'src/common/components/client-only'
import { Container } from 'src/common/components/container'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { SpecViewer } from 'src/features/docs/spec-viewer'
import { DocsLayout } from 'src/layouts/docs-layout'
import { isValidVersionString } from 'src/public-api/common/versioning'

const pathSchema = z.object({
    version: z.string()
})

export const getServerSideProps = (context: GetServerSidePropsContext) => {
    const { version } = pathSchema.parse(context.query)
    if (!isValidVersionString(version)) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            specPath: `/api/${version}/spec`
        }
    }
}

type DocsApiVersionPageProps = InferGetServerSidePropsType<
    typeof getServerSideProps
>

const DocsApiVersionPage: PageComponent<DocsApiVersionPageProps> = ({
    specPath
}) => {
    return (
        <>
            <Head>
                <title>{pageTitle('API reference')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <ClientOnly>
                <Container>
                    <Section>
                        <SpecViewer url={specPath} />
                    </Section>
                </Container>
            </ClientOnly>
        </>
    )
}

DocsApiVersionPage.layout = ({ children }) => (
    <DocsLayout>{children}</DocsLayout>
)

export default DocsApiVersionPage
