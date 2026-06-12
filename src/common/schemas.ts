import { ApiKeySchema, UserSchema } from 'prisma/main/models'
import { z } from 'zod'

export const formApiKeySchema = ApiKeySchema.extend({
    name: ApiKeySchema.shape.name.min(1, { message: 'Required' })
})

export const formTextSchema = z.string().min(1, { message: 'Required' })

export const formUserSchema = UserSchema.extend({
    firstName: UserSchema.shape.firstName
        .trim()
        .min(1, { message: 'Required' }),
    surname: UserSchema.shape.surname.min(1, { message: 'Required' }),
    email: UserSchema.shape.email.min(1, { message: 'Required' }).email(),
    password: UserSchema.shape.password.min(1, { message: 'Required' }).min(8)
})
