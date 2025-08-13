import { createEnv } from './core/create-env'
import envUtils from './core/schema-utils'

const serverEnv = createEnv({
    context: 'server',
    schema: {
        NEXT_PUBLIC_BASE_URL: envUtils.string.url(),
        MONGODB_URI: envUtils.string.url(),
        MONGODB_URI_MFLIX: envUtils.string.url(),
        API_VERSION: envUtils.number.int().gte(1).lte(1),
        MAILER_USERNAME: envUtils.string,
        MAILER_PASSWORD: envUtils.string,
        MAILER_HOST: envUtils.string,
        MAILER_PORT: envUtils.number.int(),
        MAILER_SECURE: envUtils.boolean
    }
})

export default serverEnv
