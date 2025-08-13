import React from 'react'
import { invariant } from 'src/common/invariant'

type DocsLayoutContextProps = {
    menu: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}

const DocsLayoutContext = React.createContext<DocsLayoutContextProps | null>(
    null
)

type DocsLayoutProviderProps = React.PropsWithChildren

export const DocsLayoutProvider = ({ children }: DocsLayoutProviderProps) => {
    const menu = React.useState<boolean>(false)

    return (
        <DocsLayoutContext.Provider
            value={{
                menu
            }}
        >
            {children}
        </DocsLayoutContext.Provider>
    )
}

/**
 * Returns the context for DocsLayout
 */
export const useDocsLayoutContext = () => {
    const context = React.useContext(DocsLayoutContext)
    invariant(
        context,
        'useDocsLayoutContext must be used within DocsLayoutContext'
    )
    return context
}
