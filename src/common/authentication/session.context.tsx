import React from 'react'
import { type Session } from 'src/common/authentication/session'
import { invariant } from 'src/common/invariant'

const SessionContext = React.createContext<Session | null>(null)

type SessionProviderProps = React.PropsWithChildren<{
    session: Session
}>

/**
 * Provider for the application session context
 */
export const SessionProvider = ({
    children,
    session
}: SessionProviderProps) => {
    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )
}

/**
 * Returns the application session context
 */
export const useSessionContext = () => {
    const context = React.useContext(SessionContext)
    invariant(context, 'useSessionContext must be used within SessionContext')
    return context
}
