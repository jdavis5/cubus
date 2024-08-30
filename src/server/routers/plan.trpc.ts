import { modify } from 'src/server/plan/api/modify.trpc'
import { t } from 'src/server/trpc.init'

export const plan = t.router({
    modify
})
