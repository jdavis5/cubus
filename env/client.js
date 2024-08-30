import { createEnv } from './core/create-env'
import { envString } from './core/env-schemas'

const clientEnv = createEnv({
    context: 'client',
    schema: {
        NEXT_PUBLIC_BASE_URL: envString.url()
    },
    runtime: {
        NEXT_PUBLIC_BASE_URL: process.env['NEXT_PUBLIC_BASE_URL']
    }
})

export default clientEnv
