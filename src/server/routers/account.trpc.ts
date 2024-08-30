import { requestActivation } from 'src/server/account-activation/api/request-activation.trpc'
import { submitActivation } from 'src/server/account-activation/api/submit-activation.trpc'
import { confirmRemoval } from 'src/server/account-closure/api/confirm-removal.trpc'
import { requestEmailUpdate } from 'src/server/email-update/api/request-email-update.trpc'
import { submitEmailUpdate } from 'src/server/email-update/api/submit-email-update.trpc'
import { requestPasswordReset } from 'src/server/password-reset/api/request-password-reset.trpc'
import { submitPasswordReset } from 'src/server/password-reset/api/submit-password-reset.trpc'
import { updatePassword } from 'src/server/profile/api/update-password.trpc'
import { updateProfile } from 'src/server/profile/api/update-profile.trpc'
import { t } from 'src/server/trpc.init'

export const account = t.router({
    confirmRemoval,
    requestActivation,
    requestEmailUpdate,
    requestPasswordReset,
    submitActivation,
    submitEmailUpdate,
    submitPasswordReset,
    updatePassword,
    updateProfile
})
