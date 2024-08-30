import { httpBatchLink } from '@trpc/client'
import { createTRPCNext } from '@trpc/next'
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server'
import SuperJSON from 'superjson2'
import { getCsrfTransportDocumentCookie } from 'src/server/authentication/csrf.cookies'
import { type AppRouter } from 'src/server/routers/root.trpc'

function getBaseUrl() {
    if (typeof window !== 'undefined') {
        return ''
    }
    return `http://localhost:3000`
}

export const trpc = createTRPCNext<AppRouter>({
    transformer: SuperJSON,
    config() {
        return {
            links: [
                httpBatchLink({
                    /**
                     * If you want to use SSR, you need to use the server's full URL
                     * @link https://trpc.io/docs/v11/ssr
                     **/
                    url: `${getBaseUrl()}/api/trpc`,
                    async headers() {
                        return {
                            'x-csrf-token': getCsrfTransportDocumentCookie()
                        }
                    },
                    transformer: SuperJSON
                })
            ]
        }
    },
    /**
     * @link https://trpc.io/docs/v11/ssr
     **/
    ssr: false
})

// infer the types for your router
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutputs = inferRouterOutputs<AppRouter>
