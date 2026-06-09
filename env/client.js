import { createEnv } from 'env-nextjs'
import { schemaUtils } from './schema-utils'

const clientEnv = createEnv({
    context: 'client',
    schema: {
        NEXT_PUBLIC_BASE_URL: schemaUtils.string.url()
    },
    clientRuntime: {
        NEXT_PUBLIC_BASE_URL: process.env['NEXT_PUBLIC_BASE_URL']
    }
})

export default clientEnv
