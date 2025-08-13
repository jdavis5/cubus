import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from 'src/server/routers/root.trpc'
import { createContext } from 'src/server/trpc.context'

export default createNextApiHandler({
    router: appRouter,
    createContext
})
