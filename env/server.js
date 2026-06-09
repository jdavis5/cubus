import { createEnv } from 'env-nextjs'
import { schemaUtils } from './schema-utils'

const serverEnv = createEnv({
    context: 'server',
    schema: {
        NEXT_PUBLIC_BASE_URL: schemaUtils.string.url(),
        MONGODB_URI: schemaUtils.string.url(),
        MONGODB_URI_MFLIX: schemaUtils.string.url(),
        API_VERSION: schemaUtils.number.int().gte(1).lte(1),
        MAILER_USERNAME: schemaUtils.string,
        MAILER_PASSWORD: schemaUtils.string,
        MAILER_HOST: schemaUtils.string,
        MAILER_PORT: schemaUtils.number.int(),
        MAILER_SECURE: schemaUtils.boolean        
    }
})

export default serverEnv
