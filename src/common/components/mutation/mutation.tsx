import React from 'react'
import { MutationOverlay } from 'src/common/components/mutation-overlay'
import { MutationSnackbar } from 'src/common/components/mutation-snackbar'

type MutationProps = React.PropsWithChildren<{
    variant?: 'normal' | 'overlay'
    error: { message: string } | null
    status: 'idle' | 'pending' | 'error' | 'success'
    reset: () => void
}>

export const Mutation = ({
    children,
    variant = 'normal',
    ...props
}: MutationProps) => {
    if (variant === 'overlay') {
        return (
            <>
                <MutationOverlay {...props} />
                {children}
            </>
        )
    }

    return (
        <>
            <MutationSnackbar {...props} />
            {children}
        </>
    )
}
