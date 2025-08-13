import { Prisma } from 'prisma/main/client'
import accountActivation from './account-activation/account-activation.extension'
import apiKeys from './api-keys/api-keys.extension'
import authentication from './authentication/authentication.extension'
import emailUpdate from './email-update/email-update.extension'
import passwordReset from './password-reset/password-reset.extension'
import plan from './plan/plan.extension'
import profile from './profile/profile.extension'
import registration from './registration/registration.extension'
import subscriptionSummary from './subscription-summary/subscription-summary.extension'

export default Prisma.defineExtension((client) => {
    return client
        .$extends(accountActivation)
        .$extends(apiKeys)
        .$extends(authentication)
        .$extends(emailUpdate)
        .$extends(passwordReset)
        .$extends(plan)
        .$extends(profile)
        .$extends(registration)
        .$extends(subscriptionSummary)
})
