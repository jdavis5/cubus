import { type CreateNextContextOptions } from '@trpc/server/adapters/next'

export const createContext = async (opts: CreateNextContextOptions) => {
    return opts
}

export type Context = Awaited<ReturnType<typeof createContext>>
