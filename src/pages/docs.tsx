import Head from 'next/head'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { Subheading } from 'src/common/components/subheading'
import { type PageComponent, pageTitle } from 'src/common/page'
import { DocsLayout } from 'src/layouts/docs-layout'

const DocsPage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('Documentation')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Documentation</Heading>
                    <Subheading>Get started with Cubus</Subheading>
                    <p>
                        Consectetur adipiscing elit ut aliquam. Blandit cursus
                        risus at ultrices mi. Et netus et malesuada fames ac.
                        Risus pretium quam vulputate dignissim suspendisse in
                        est ante in. Donec massa sapien faucibus et molestie ac
                        feugiat sed. Nunc vel risus commodo viverra maecenas
                        accumsan lacus. Magna fringilla urna porttitor rhoncus
                        dolor purus non enim praesent. Tortor posuere ac ut
                        consequat semper. Ligula ullamcorper malesuada proin
                        libero nunc consequat interdum varius. Sapien faucibus
                        et molestie ac feugiat. Sit amet commodo nulla facilisi
                        nullam vehicula ipsum. A arcu cursus vitae congue mauris
                        rhoncus aenean. Morbi blandit cursus risus at.
                        Pellentesque massa placerat duis ultricies lacus sed
                        turpis. Blandit turpis cursus in hac. Sit amet mattis
                        vulputate enim nulla aliquet porttitor.
                    </p>
                </Section>
            </Container>
        </>
    )
}

DocsPage.layout = ({ children }) => <DocsLayout>{children}</DocsLayout>

export default DocsPage
