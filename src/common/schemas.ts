import * as model from 'prisma/main/schemas'
import { z } from 'zod'

export const formUserSchema = model.UserSchema.extend({
    firstName: model.UserSchema.shape.firstName
        .trim()
        .min(1, { message: 'Required' }),
    surname: model.UserSchema.shape.surname.min(1, { message: 'Required' }),
    email: model.UserSchema.shape.email.min(1, { message: 'Required' }).email(),
    password: model.UserSchema.shape.password
        .min(1, { message: 'Required' })
        .min(8)
})

export const formApiKeySchema = model.ApiKeySchema.extend({
    name: model.ApiKeySchema.shape.name.min(1, { message: 'Required' })
})

export const formTextSchema = z.string().min(1, { message: 'Required' })
