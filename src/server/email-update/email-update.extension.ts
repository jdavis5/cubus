import { Prisma } from 'prisma/main/client'
import { createEmailUpdate } from './extensions/create-email-update'
import { findValidEmailUpdateSummary } from './extensions/find-valid-email-update-summary'
import { removeEmailUpdate } from './extensions/remove-email-update'

export default Prisma.defineExtension({
    name: 'email-update.extension',
    model: {
        token: {
            createEmailUpdate,
            findValidEmailUpdateSummary,
            removeEmailUpdate
        }
    }
})
