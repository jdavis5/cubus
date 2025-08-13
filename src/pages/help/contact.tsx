import Head from 'next/head'
import { Container } from 'src/common/components/container'
import { Heading } from 'src/common/components/heading'
import { Section } from 'src/common/components/section'
import { type PageComponent, pageTitle } from 'src/common/page'
import { BaseLayout } from 'src/layouts/base-layout'
import { withSession } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withSession()

const HelpContactPage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>{pageTitle('Contact')}</title>
                <meta
                    name="description"
                    content="A description about this page"
                />
                <meta name="keywords" content="some keywords" />
            </Head>
            <Container>
                <Section>
                    <Heading as="h1">Contact us</Heading>
                    <p>
                        In nulla posuere sollicitudin aliquam ultrices.
                        Pellentesque elit ullamcorper dignissim cras tincidunt
                        lobortis feugiat vivamus. Auctor elit sed vulputate mi
                        sit amet. Faucibus turpis in eu mi. Pretium aenean
                        pharetra magna ac placerat vestibulum lectus. Massa
                        tincidunt dui ut ornare lectus sit amet est placerat.
                        Magna sit amet purus gravida quis blandit turpis. Arcu
                        dictum varius duis at consectetur lorem donec massa
                        sapien. Lacus vel facilisis volutpat est velit egestas
                        dui id. Mi bibendum neque egestas congue quisque egestas
                        diam. Diam maecenas sed enim ut sem viverra. Molestie a
                        iaculis at erat pellentesque. Massa placerat duis
                        ultricies lacus sed turpis tincidunt id aliquet. Et
                        tortor at risus viverra adipiscing at.
                    </p>
                </Section>
            </Container>
        </>
    )
}

HelpContactPage.layout = ({ children }) => <BaseLayout>{children}</BaseLayout>

export default HelpContactPage
