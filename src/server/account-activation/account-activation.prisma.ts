import { Prisma } from 'prisma/main/client'
import { activateAccount } from './extensions/activate-account'
import { createAccountActivation } from './extensions/create-account-activation'
import { findValidAccountActivationSummary } from './extensions/find-valid-account-activation-summary'
import { removeAccountActivation } from './extensions/remove-account-activation'

export default Prisma.defineExtension({
    name: 'accountActivation.extension',
    model: {
        token: {
            createAccountActivation,
            findValidAccountActivationSummary,
            removeAccountActivation
        },
        user: {
            activateAccount
        }
    }
})
