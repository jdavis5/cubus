import { Prisma } from 'prisma/main/client'
import { createPasswordReset } from './extensions/create-password-reset'
import { findValidPasswordResetSummary } from './extensions/find-valid-password-reset-summary'
import { removePasswordReset } from './extensions/remove-password-reset'

export default Prisma.defineExtension({
    name: 'password-reset.extension',
    model: {
        token: {
            createPasswordReset,
            findValidPasswordResetSummary,
            removePasswordReset
        }
    }
})
