import { Prisma } from 'prisma/main/client'
import accountActivation from './account-activation/account-activation.prisma'
import apiKeys from './api-keys/api-keys.prisma'
import authentication from './authentication/authentication.prisma'
import emailUpdate from './email-update/email-update.prisma'
import passwordReset from './password-reset/password-reset.prisma'
import plan from './plan/plan.prisma'
import profile from './profile/profile.prisma'
import registration from './registration/registration.prisma'
import subscriptionSummary from './subscription-summary/subscription-summary.prisma'

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
