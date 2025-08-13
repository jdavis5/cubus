import { createEnv } from './core/create-env'
import envUtils from './core/schema-utils'

const clientEnv = createEnv({
    context: 'client',
    schema: {
        NEXT_PUBLIC_BASE_URL: envUtils.string.url()
    },
    runtime: {
        NEXT_PUBLIC_BASE_URL: process.env['NEXT_PUBLIC_BASE_URL']
    }
})

export default clientEnv
