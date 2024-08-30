import Head from 'next/head'
import { type PageComponent } from 'src/common/page'
import { BaseHomeContent } from 'src/features/base-home/base-home-content'
import { BaseLayout } from 'src/layouts/base-layout'
import { withSession } from 'src/server/authentication/session.gssp'

export const getServerSideProps = withSession()

const IndexPage: PageComponent = () => {
    return (
        <>
            <Head>
                <title>Get started with Cubus</title>
                <meta name="description" content="A description of this page" />
                <meta name="keywords" content="some keywords" />
            </Head>
            <BaseHomeContent />
        </>
    )
}

IndexPage.layout = ({ children }) => <BaseLayout>{children}</BaseLayout>

export default IndexPage
