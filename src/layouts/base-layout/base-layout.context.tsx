import React from 'react'
import { invariant } from 'src/common/invariant'

type BaseLayoutContextProps = {
    menu: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const BaseLayoutContext = React.createContext<BaseLayoutContextProps | null>(
    null
)

type BaseLayoutProviderProps = React.PropsWithChildren

export const BaseProvider = ({ children }: BaseLayoutProviderProps) => {
    const menu = React.useState<boolean>(false)

    return (
        <BaseLayoutContext.Provider
            value={{
                menu
            }}
        >
            {children}
        </BaseLayoutContext.Provider>
    )
}

/**
 * Returns the context for BaseLayout
 */
export const useBaseLayoutContext = () => {
    const context = React.useContext(BaseLayoutContext)
    invariant(
        context,
        'useBaseLayoutContext must be used within BaseLayoutContext'
    )
    return context
}
