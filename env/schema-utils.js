import { z } from 'zod'

const stringSchema = z.string().min(1)

const numberSchema = z.coerce.number().finite()

const booleanSchema = z
    .union([
        z.literal('true'),
        z.literal('false'),
        z.literal('1'),
        z.literal('0')
    ])
    .transform((value) => value === 'true' || value === '1')

export const schemaUtils = {
    string: stringSchema,
    number: numberSchema,
    boolean: booleanSchema
}
