import { createEnv } from './core/create-env'
import { envBoolean, envNumber, envString } from './core/env-schemas'

const serverEnv = createEnv({
    context: 'server',
    schema: {
        NEXT_PUBLIC_BASE_URL: envString.url(),
        MONGODB_URI: envString.url(),
        MONGODB_URI_MFLIX: envString.url(),
        API_VERSION: envNumber.int().gte(1).lte(1),
        MAILER_USER: envString,
        MAILER_PASSWORD: envString,
        MAILER_HOST: envString,
        MAILER_PORT: envNumber.int(),
        MAILER_SECURE: envBoolean
    }
})

export default serverEnv
