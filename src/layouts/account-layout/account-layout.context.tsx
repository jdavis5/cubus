import React from 'react'
import { invariant } from 'src/common/invariant'

type AccountLayoutContextProps = {
    menu: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const AccountLayoutContext =
    React.createContext<AccountLayoutContextProps | null>(null)

type AccountLayoutProviderProps = React.PropsWithChildren

export const AccountLayoutProvider = ({
    children
}: AccountLayoutProviderProps) => {
    const menu = React.useState<boolean>(false)

    return (
        <AccountLayoutContext.Provider
            value={{
                menu
            }}
        >
            {children}
        </AccountLayoutContext.Provider>
    )
}

/**
 * Returns the context for AccountLayout
 */
export const useAccountLayoutContext = () => {
    const context = React.useContext(AccountLayoutContext)
    invariant(
        context,
        'useAccountLayoutContext must be used within AccountLayoutContext'
    )
    return context
}
