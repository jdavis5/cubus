import { type RoleOptions } from 'prisma/main/client'
import { useSessionContext } from 'src/common/authentication/session.context'
import { invariant } from 'src/common/invariant'

type SessionUser = {
    id: string
    firstName: string
    roles: Array<RoleOptions>
    lastLoginAt: Date | null
    email: string
    emailVerifiedAt: Date | null
}

export type Session = {
    user: SessionUser | null
}

export type AuthenticatedSession = {
    user: SessionUser
}

/**
 * Returns an application session
 */
export const useSession = (): Session => {
    return useSessionContext()
}

/**
 * Type guard that narrows the application session if user data is present
 */
export const isAuthenticatedSession = (
    session: Session | AuthenticatedSession
): session is AuthenticatedSession => {
    return session.user !== null
}

/**
 * Returns an authenticated application session
 */
export const useAuthenticatedSession = (): AuthenticatedSession => {
    const context = useSessionContext()
    const user = context.user
    invariant(user, 'Authenticated session used outside of proper context')
    return { ...context, user }
}
