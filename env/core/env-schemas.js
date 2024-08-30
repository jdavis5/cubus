import { z } from 'zod'

export const envBoolean = z
    .enum(['true', 'false'])
    .transform((i) => i === 'true')

export const envNumber = z.coerce.number()

export const envString = z.string()
