import { z } from 'zod'

export const requestSchema = z
    .object({
        url: z.string()
    })
    .transform((val) => ({
        url: val.url,
        searchParams: new URLSearchParams(val.url.split('?', 2)[1])
    }))
