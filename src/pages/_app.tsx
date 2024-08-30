import 'src/common/styles/globals.scss'
import React from 'react'
import { type AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'src/common/authentication/session.context'
import { ErrorBoundary } from 'src/common/components/error-boundary'
import { type PageComponent } from 'src/common/page'
import { trpc } from 'src/common/trpc.client'

type ExtendedAppProps = AppProps & {
    Component: PageComponent
}

const queryClient = new QueryClient()

const EmptyLayout = ({ children }: React.PropsWithChildren) => <>{children}</>

const App = ({ Component, pageProps }: ExtendedAppProps) => {
    const ComponentLayout = Component.layout ?? EmptyLayout

    return (
        <ErrorBoundary>
            <SessionProvider session={pageProps.session}>
                <QueryClientProvider client={queryClient}>
                    <ComponentLayout>
                        <Component {...pageProps} />
                    </ComponentLayout>
                    <div id="outside-content"></div>
                </QueryClientProvider>
            </SessionProvider>
        </ErrorBoundary>
    )
}

export default trpc.withTRPC(App)
