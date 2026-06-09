import { Prisma } from 'prisma/main/client'
import { createSession } from './extensions/create-session'
import { deleteSession } from './extensions/delete-session'
import { findValidSession } from './extensions/find-valid-session'

export default Prisma.defineExtension({
    name: 'authentication.extension',
    model: {
        token: {
            createSession,
            findValidSession,
            deleteSession
        }
    }
})
