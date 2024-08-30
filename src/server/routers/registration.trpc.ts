import { registerByEmail } from 'src/server/registration/api/register-by-email.trpc'
import { t } from 'src/server/trpc.init'

export const registration = t.router({
    registerByEmail
})
