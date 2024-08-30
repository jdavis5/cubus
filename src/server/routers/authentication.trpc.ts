import { identifyUser } from 'src/server/authentication/api/identify-user.trpc'
import { loginUser } from 'src/server/authentication/api/login-user.trpc'
import { logoutUser } from 'src/server/authentication/api/logout-user.trpc'
import { t } from 'src/server/trpc.init'

export const authentication = t.router({
    identifyUser,
    loginUser,
    logoutUser
})
