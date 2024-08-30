import { Prisma } from 'prisma/main/client'
import { register } from './extensions/register'

export default Prisma.defineExtension({
    name: 'registration.extension',
    model: {
        user: {
            register
        }
    }
})
