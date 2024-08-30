import { account } from 'src/server/routers/account.trpc'
import { apiKeys } from 'src/server/routers/api-keys.trpc'
import { authentication } from 'src/server/routers/authentication.trpc'
import { plan } from 'src/server/routers/plan.trpc'
import { registration } from 'src/server/routers/registration.trpc'
import { t } from 'src/server/trpc.init'

export const appRouter = t.router({
    account,
    apiKeys,
    authentication,
    registration,
    plan
})

export type AppRouter = typeof appRouter
